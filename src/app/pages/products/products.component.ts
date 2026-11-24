import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { ProductDto } from 'src/app/models/products.dto';
import { SearchState } from 'src/app/models/search.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopInfo, getShop } from 'src/app/config/shops.config';
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
})
export class ProductsComponent implements OnInit, OnDestroy {
  /** Results in the order the API returned them. */
  defaultProducts: ProductDto[] = [];
  /** Results after sorting and filtering — what the grid shows. */
  products: ProductDto[] = [];

  searchState: SearchState = SearchState.Initial;
  searchStates = SearchState;
  errorMessage: string | null = null;
  categoryPage: number = 1;
  isLoggedIn: boolean = false;

  sortValue: SortOption = 'default';
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.products$.subscribe((data) => {
        this.defaultProducts = data;
        this.sortValue = 'default';
        this.shopFilter = null;
        this.discountOnly = false;
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
        this.errorMessage = error ? error.statusText || 'An error occurred' : null;
      })
    );

    this.subscriptions.add(
      this.productService.categoryId
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.categoryPage = 1;
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
    const categoryId = this.productService.categoryId.getValue();
    this.categoryPage++;
    this.productService.getCategory(categoryId, this.categoryPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousePage() {
    if (this.categoryPage > 1) {
      const categoryId = this.productService.categoryId.getValue();

      this.categoryPage--;
      this.productService.getCategory(categoryId, this.categoryPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setShopFilter(shopId: number | null) {
    this.shopFilter = shopId;
    this.applyView();
  }

  clearFilters() {
    this.shopFilter = null;
    this.discountOnly = false;
    this.applyView();
  }

  toggleDiscountOnly() {
    this.discountOnly = !this.discountOnly;
    this.applyView();
  }

  /** "8 preces no 2 veikaliem" */
  get resultSummary(): string {
    const count = this.products.length;
    const shops = new Set(this.products.map((p) => p.id)).size;
    const items = `${count} ${this.isSingular(count) ? 'prece' : 'preces'}`;
    return `${items} no ${shops} ${this.isSingular(shops) ? 'veikala' : 'veikaliem'}`;
  }

  loyaltyCardLabel(product: ProductDto): string {
    return getShop(product.id).loyaltyCard ?? 'klienta karti';
  }

  hideBrokenImage(event: Event) {
    (event.target as HTMLImageElement).style.visibility = 'hidden';
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

  private isSingular(n: number): boolean {
    return n % 10 === 1 && n % 100 !== 11;
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
