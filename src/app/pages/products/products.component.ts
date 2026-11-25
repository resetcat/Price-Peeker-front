import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { ProductDto } from 'src/app/models/products.dto';
import { SearchState } from 'src/app/models/search.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/category.service';
import { ShopInfo, getShop, getShopIds } from 'src/app/config/shops.config';
import {
  PARAM,
  categoryParams,
  parseShopType,
} from 'src/app/config/search-params';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/i18n/language.service';
import { NotificationModalComponent } from '../modals/notification-modal/notification-modal.component';
import { TelegramInsctructionComponent } from '../modals/telegram-insctruction/telegram-insctruction.component';

type SortOption =
  | 'default'
  | 'priceAsc'
  | 'priceDesc'
  | 'discount'
  | 'pricePerUnitAsc'
  | 'pricePerUnitDesc';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProductsComponent implements OnInit, OnDestroy {
  /** Results in the order the API returned them. */
  defaultProducts: ProductDto[] = [];
  /** Results after sorting and filtering — what the grid shows. */
  products: ProductDto[] = [];

  searchState: SearchState = SearchState.Initial;
  searchStates = SearchState;
  /** Set when the last request failed. */
  loadFailed = false;
  categoryPage: number = 1;
  isLoggedIn: boolean = false;

  sortValue: SortOption = 'default';
  /** Labels are translation keys: sort.<value>. */
  readonly sortOptions: { value: SortOption; labelKey: string }[] = [
    { value: 'default', labelKey: 'sort.default' },
    { value: 'priceAsc', labelKey: 'sort.priceAsc' },
    { value: 'priceDesc', labelKey: 'sort.priceDesc' },
    { value: 'discount', labelKey: 'sort.discount' },
    { value: 'pricePerUnitAsc', labelKey: 'sort.pricePerUnitAsc' },
    { value: 'pricePerUnitDesc', labelKey: 'sort.pricePerUnitDesc' },
  ];
  shopFilter: number | null = null;
  discountOnly = false;
  shopsInResults: ShopInfo[] = [];
  hasDiscounts = false;

  readonly skeletons = Array.from({ length: 8 });
  loading$ = this.productService.loading.asObservable();
  categoryId$ = this.productService.categoryId.asObservable();
  context$ = this.productService.resultContext.asObservable();
  getShop = getShop;

  private subscriptions = new Subscription();

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    public lang: LanguageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.products$.subscribe((data) => {
        this.defaultProducts = data;
        this.shopsInResults = Array.from(new Set(data.map((p) => p.id))).map(getShop);
        this.hasDiscounts = data.some((p) => !!p.discountedPrice);
        this.applyView();
      })
    );

    this.subscriptions.add(
      this.productService.searchState$.subscribe((state) => {
        this.searchState = state;
      })
    );

    this.subscriptions.add(
      this.productService.error$.subscribe((error) => {
        this.loadFailed = !!error;
      })
    );

    // The URL decides what is shown: search, category page and filters.
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.loadResults(params);
        this.applyFilterParams(params);
      })
    );

    this.authService.validateToken();
    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openProduct(item: ProductDto) {
    this.dialog.open(NotificationModalComponent, { data: item });
  }

  openTelegramInstructions() {
    this.dialog.open(TelegramInsctructionComponent);
  }

  nextPage() {
    this.goToPage(this.categoryPage + 1);
  }

  previousePage() {
    if (this.categoryPage > 1) {
      this.goToPage(this.categoryPage - 1);
    }
  }

  setSort(value: SortOption) {
    this.updateParams({ [PARAM.sort]: value === 'default' ? null : value });
  }

  setShopFilter(shopId: number | null) {
    this.updateParams({ [PARAM.shop]: shopId });
  }

  clearFilters() {
    this.updateParams({ [PARAM.shop]: null, [PARAM.deals]: null });
  }

  toggleDiscountOnly() {
    this.updateParams({ [PARAM.deals]: this.discountOnly ? null : 1 });
  }

  /** "8 preces no 2 veikaliem" / "8 items from 2 shops" / "8 товаров в 2 магазинах" */
  get resultSummary(): string {
    const count = this.products.length;
    const shops = new Set(this.products.map((p) => p.id)).size;
    return `${this.lang.plural('results.items', count)} ${this.lang.plural('results.shops', shops)}`;
  }

  /** The shop's loyalty card, e.g. "R" for "Tikai ar R-karti"; null when the shop has no named card. */
  loyaltyCard(product: ProductDto): string | null {
    return getShop(product.id).loyaltyCard ?? null;
  }

  hideBrokenImage(event: Event) {
    (event.target as HTMLImageElement).style.visibility = 'hidden';
  }

  /** Loads what the URL asks for, unless those results are already loaded. */
  private loadResults(params: ParamMap) {
    const query = params.get(PARAM.query)?.trim();
    const categoryId = Number(params.get(PARAM.category));
    const page = Math.max(1, Math.floor(Number(params.get(PARAM.page))) || 1);

    if (query) {
      const type = parseShopType(params.get(PARAM.type));
      this.loadOnce(`search:${type}:${query}`, () =>
        this.productService.getProducts(query, getShopIds(type))
      );
    } else if (Number.isInteger(categoryId) && categoryId > 0) {
      this.categoryPage = page;
      this.loadOnce(`category:${categoryId}:${page}`, () => {
        const sameCategory = this.productService.categoryId.value === categoryId;
        // Keep the title while paging; a new category shows a placeholder
        // until its name is looked up.
        this.productService.getCategory(
          categoryId,
          page,
          sameCategory ? undefined : this.translate.instant('results.categoryPlaceholder')
        );
        if (!sameCategory) {
          this.showCategoryName(categoryId);
        }
      });
    } else {
      this.loadOnce('home', () => this.productService.clear());
    }
  }

  private loadOnce(key: string, load: () => void) {
    if (this.productService.currentKey === key) {
      return;
    }
    this.productService.currentKey = key;
    load();
  }

  private showCategoryName(id: number) {
    this.categoryService
      .getAllCategories()
      .pipe(first())
      .subscribe({
        next: (categories) => {
          const name = categories
            .flatMap((parent) => [parent, ...(parent.categories ?? [])])
            .find((category) => category.id === id)?.name;
          const stillShowing =
            this.productService.currentKey?.startsWith(`category:${id}:`) ?? false;
          if (name && stillShowing) {
            this.productService.resultContext.next({ kind: 'category', label: name });
          }
        },
        error: () => {
          // Keep the placeholder title.
        },
      });
  }

  private applyFilterParams(params: ParamMap) {
    const sort = params.get(PARAM.sort);
    this.sortValue = this.sortOptions.some((option) => option.value === sort)
      ? (sort as SortOption)
      : 'default';
    const shop = Number(params.get(PARAM.shop));
    this.shopFilter = params.has(PARAM.shop) && Number.isInteger(shop) ? shop : null;
    this.discountOnly = params.get(PARAM.deals) === '1';
    this.applyView();
  }

  /** Filter changes replace the current history entry instead of adding one. */
  private updateParams(changes: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: changes,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private goToPage(page: number) {
    const categoryId = Number(this.route.snapshot.queryParamMap.get(PARAM.category));
    if (!categoryId) {
      return;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: categoryParams(categoryId, page),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  applyView(): void {
    let list = this.sortList([...this.defaultProducts], this.sortValue);
    if (this.shopFilter !== null) {
      list = list.filter((p) => p.id === this.shopFilter);
    }
    if (this.discountOnly) {
      list = list.filter((p) => !!p.discountedPrice);
    }
    this.products = list;
  }

  private sortList(list: ProductDto[], value: SortOption): ProductDto[] {
    switch (value) {
      case 'priceAsc':
        return list.sort(
          (a, b) => this.getEffectivePrice(a) - this.getEffectivePrice(b)
        );
      case 'priceDesc':
        return list.sort(
          (a, b) => this.getEffectivePrice(b) - this.getEffectivePrice(a)
        );
      case 'discount':
        return this.sortBy(list, 'discount', false);
      case 'pricePerUnitAsc':
        return this.sortBy(list, 'pricePerUnit', true);
      case 'pricePerUnitDesc':
        return this.sortBy(list, 'pricePerUnit', false);
      default:
        return list;
    }
  }

  private getEffectivePrice(p: ProductDto): number {
    const price = p.discountedPrice != null ? p.discountedPrice : p.originalPrice;
    // Shops send prices as numbers or strings like "1.49€".
    const amount = parseFloat(String(price).replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(amount) ? amount : Number.MAX_VALUE;
  }

  sortBy(list: any[], key: string, isAsc: boolean): any[] {
    return list.sort((a: any, b: any) => {
      const priority =
        this.prioritizeFalsy(a[key]) - this.prioritizeFalsy(b[key]);

      if (priority !== 0) return priority;

      const aValue =
        key === 'pricePerUnit' ? this.extractNumber(a[key]) : a[key];
      const bValue =
        key === 'pricePerUnit' ? this.extractNumber(b[key]) : b[key];

      return isAsc ? aValue - bValue : bValue - aValue;
    });
  }

  prioritizeFalsy(value: any): number {
    return value ? 0 : 1;
  }

  extractNumber(priceStr: string) {
    const match = priceStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
  }
}
