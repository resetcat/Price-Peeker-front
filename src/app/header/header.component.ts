import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import {
  SHOP_TYPES,
  ShopType,
  ShopTypeId,
  getShopIds,
} from '../config/shops.config';
import { NotificationModalComponent } from '../pages/modals/notification-modal/notification-modal.component';

const LIGHT_THEME = 'peeker-light';
const DARK_THEME = 'peeker-dark';
const LEGACY_THEMES: Record<string, string> = {
  cupcake: LIGHT_THEME,
  business: DARK_THEME,
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  isDarkTheme: boolean = false;
  searchQuery: string = '';
  loading$ = this.productService.loading.asObservable();
  isLoggedIn$ = this.authService.isLoggedIn$;
  drawerOpen: boolean = false;

  // Store types come from config — adding "Aptiekas" there adds it here.
  readonly shopTypes: ShopType[] = SHOP_TYPES;
  currentShopType: ShopTypeId = SHOP_TYPES[0].id;
  selectedShops: number[] = getShopIds(this.currentShopType);

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  selectShopType(type: ShopTypeId) {
    this.currentShopType = type;
    this.selectedShops = getShopIds(type);
  }

  getProducts() {
    const query = this.searchQuery.trim();
    if (!query) {
      this.searchInput?.nativeElement.focus();
      return;
    }
    this.productService.getProducts(query, this.selectedShops);
    this.drawerOpen = false;
    this.searchInput?.nativeElement.blur();
    this.goHome();
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchInput?.nativeElement.focus();
  }

  focusSearch() {
    this.drawerOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.searchInput?.nativeElement.focus();
  }

  onCategorySelected() {
    this.drawerOpen = false;
    this.goHome();
  }

  openNotifications() {
    this.dialog.open(NotificationModalComponent, { data: null });
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.setTheme(!this.isDarkTheme);
  }

  private initializeTheme() {
    const stored = localStorage.getItem('theme');
    if (stored && LEGACY_THEMES[stored]) {
      // Upgrade the old cupcake/business setting to the new theme names.
      this.setTheme(LEGACY_THEMES[stored] === DARK_THEME);
      return;
    }
    const current = document.documentElement.getAttribute('data-theme');
    const isDark = stored
      ? stored === DARK_THEME
      : current
      ? current === DARK_THEME
      : window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.isDarkTheme = isDark;
    document.documentElement.setAttribute('data-theme', isDark ? DARK_THEME : LIGHT_THEME);
  }

  private setTheme(isDark: boolean) {
    this.isDarkTheme = isDark;
    const theme = isDark ? DARK_THEME : LIGHT_THEME;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  private goHome() {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }
}
