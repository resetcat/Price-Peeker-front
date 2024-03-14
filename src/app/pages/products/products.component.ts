import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { distinctUntilChanged } from 'rxjs';
import { ProductDto } from 'src/app/models/products.dto';
import { SearchState } from 'src/app/models/search.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { NotificationModalComponent } from '../modals/notification-modal/notification-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  shops: any = {
    1: { color: 'bg-R-shop', name: 'R-shop' },
    2: { color: 'bg-M-shop', name: 'M-shop' },
    // Add more shops here as needed
    10: { color: 'bg-S&V-shop', name: 'S&V-shop' },
    11: { color: 'bg-LB-shop', name: 'LB-shop' },
    12: { color: 'bg-V-shop', name: 'V-shop' },
    13: { color: 'bg-AO-shop', name: 'AO-shop' },
    14: { color: 'bg-SA-shop', name: 'SA-shop' },
  };
  products: ProductDto[] = [
    {
      id: 1,
      name: 'Selerijas sakne kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_217120_KGM_LV',
      originalPrice: 1.49,
      pricePerUnit: '1.49€/kg',
      cardOwnerOnly: false,
      discountedPrice: 1.22,
    },
    {
      id: 2,
      name: 'Selerijas ar jūras kāpostiem 200g',
      imgURL:
        'https://cdn.barbora.lv/products/f1384e9b-4f25-4ceb-acfc-5f0eca339b0e_s.png',
      originalPrice: 1.69,
      pricePerUnit: '8.45€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Seleriju kāti I Love Eco 300g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_915029_PCE_LV',
      originalPrice: 1.99,
      pricePerUnit: '6.63€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Marinētas selerijas SMAK rīvētas 300g',
      imgURL:
        'https://cdn.barbora.lv/products/cadd67a5-f13d-462d-bdf0-91a678f95c87_s.png',
      originalPrice: 1.39,
      pricePerUnit: '4.63€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Seleriju saknes kg',
      imgURL:
        'https://cdn.barbora.lv/products/961baf8e-54be-4dd1-871a-800c8ea91eae_s.png',
      originalPrice: 1.49,
      pricePerUnit: '1.49€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Seleriju kāti gab.',
      imgURL:
        'https://cdn.barbora.lv/products/67429b52-de33-4b42-9334-cbf81509b95b_s.png',
      originalPrice: 1.49,
      pricePerUnit: '1.49€/gab.',
      cardOwnerOnly: false,
    },
  ];
  defaultProducts: ProductDto[] = [];
  loading$ = this.productService.loading.asObservable();
  searchStates = SearchState;
  searchState: SearchState | undefined;
  errorMessage: string | null = null;
  @ViewChild('select') select!: ElementRef;
  categoryPage: number = 1;
  categoryId$ = this.productService.categoryId.asObservable();
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.productService.products$.subscribe((data) => {
    //   this.products = data;
    //   this.defaultProducts = data;
    //   this.resetSortOrder();
    // });

    this.productService.searchState$.subscribe((state) => {
      this.searchState = state;
    });

    this.productService.error$.subscribe((error) => {
      if (error) {
        this.errorMessage = error.statusText || 'An error occurred'; // Fallback message
      } else {
        this.errorMessage = null; // Reset the error message when there's no error
      }
    });

    this.productService.categoryId
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.categoryPage = 1;
      });
    this.authService.validateToken();
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onImageClick(item: ProductDto) {
    if (this.isLoggedIn) {
      this.dialog.open(NotificationModalComponent, {
        data: item,
      });
    }
  }

  nextPage() {
    const categoryId = this.productService.categoryId.getValue();
    this.categoryPage++;
    this.productService.getCategory(categoryId, this.categoryPage);
  }

  previousePage() {
    if (this.categoryPage > 1) {
      const categoryId = this.productService.categoryId.getValue();

      this.categoryPage--;
      this.productService.getCategory(categoryId, this.categoryPage);
    }
  }

  getShopColor(id: number): string {
    return this.shops[id] ? this.shops[id].color : 'default-color';
  }

  getShopName(id: number): string {
    return this.shops[id] ? this.shops[id].name : 'Unknown Shop';
  }

  resetSortOrder(): void {
    if (this.select && this.select.nativeElement) {
      const selectElement = this.select.nativeElement as HTMLSelectElement;
      selectElement.value = 'default';
    }
  }

  sortProducts(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    switch (value) {
      case 'priceAsc':
        this.products = this.sortBy('originalPrice', true);
        break;
      case 'priceDesc':
        this.products = this.sortBy('originalPrice', false);
        break;
      case 'discount':
        this.products = this.sortBy('discount', false);
        break;
      case 'pricePerUnitAsc':
        this.products = this.sortBy('pricePerUnit', true);
        break;
      case 'pricePerUnitDesc':
        this.products = this.sortBy('pricePerUnit', false);
        break;
      default:
        this.products = [...this.defaultProducts];
        break;
    }
  }

  sortBy(key: string, isAsc: boolean): any[] {
    return [...this.products].sort((a: any, b: any) => {
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
