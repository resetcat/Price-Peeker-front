import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
/** Below this width the mobile layout (compact search bar, bottom menu) is used. */
const MOBILE_QUERY = '(max-width: 1023.98px)';
/** How far you need to scroll before the bottom menu hides or comes back. */
const SCROLL_THRESHOLD = 10;

const LEGACY_THEMES: Record<string, string> = {
  cupcake: LIGHT_THEME,
  business: DARK_THEME,
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('headerEl') headerEl?: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('compactInput') compactInput?: ElementRef<HTMLInputElement>;
  @ViewChild('compactBar') compactBar?: ElementRef<HTMLElement>;

  isDarkTheme: boolean = false;
  searchQuery: string = '';
  loading$ = this.productService.loading.asObservable();
  isLoggedIn$ = this.authService.isLoggedIn$;
  drawerOpen: boolean = false;

  // Mobile: slim search bar once the full header has scrolled away,
  // bottom menu hidden while scrolling down.
  showCompactBar = false;
  hideBottomNav = false;
  private lastScrollY = 0;
  private removeScrollListener?: () => void;

  // Store types come from config — adding "Aptiekas" there adds it here.
  readonly shopTypes: ShopType[] = SHOP_TYPES;
  currentShopType: ShopTypeId = SHOP_TYPES[0].id;
  selectedShops: number[] = getShopIds(this.currentShopType);

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private dialog: MatDialog,
    public router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  ngAfterViewInit(): void {
    // Listen outside Angular so scrolling doesn't trigger change detection;
    // re-enter only when something visible changes.
    this.zone.runOutsideAngular(() => {
      const onScroll = () => this.onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.removeScrollListener = () =>
        window.removeEventListener('scroll', onScroll);
    });
  }

  ngOnDestroy(): void {
    this.removeScrollListener?.();
  }

  selectShopType(type: ShopTypeId) {
    this.currentShopType = type;
    this.selectedShops = getShopIds(type);
  }

  getProducts(input?: HTMLInputElement) {
    const query = this.searchQuery.trim();
    if (!query) {
      (input ?? this.searchInput?.nativeElement)?.focus();
      return;
    }
    this.productService.getProducts(query, this.selectedShops);
    this.drawerOpen = false;
    input?.blur();
    this.searchInput?.nativeElement.blur();
    this.goHome();
    this.revealResults();
  }

  clearSearch(input?: HTMLInputElement) {
    this.searchQuery = '';
    (input ?? this.searchInput?.nativeElement)?.focus();
  }

  focusSearch() {
    this.drawerOpen = false;
    if (this.showCompactBar) {
      this.compactInput?.nativeElement.focus();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.searchInput?.nativeElement.focus();
    }
  }

  onCategorySelected() {
    this.drawerOpen = false;
    this.goHome();
    this.revealResults();
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

  private onScroll() {
    const y = Math.max(window.scrollY, 0);
    const headerHeight = this.headerEl?.nativeElement.offsetHeight ?? 0;
    // Show the slim bar as soon as it would only be covering the header's last row.
    const showCompactBar =
      headerHeight > 0 && y >= headerHeight - this.compactBarHeight();

    let hideBottomNav = this.hideBottomNav;
    const delta = y - this.lastScrollY;
    if (Math.abs(delta) >= SCROLL_THRESHOLD) {
      hideBottomNav = delta > 0;
      this.lastScrollY = y;
    }
    if (y < headerHeight) {
      hideBottomNav = false;
    }

    if (
      showCompactBar !== this.showCompactBar ||
      hideBottomNav !== this.hideBottomNav
    ) {
      this.zone.run(() => {
        this.showCompactBar = showCompactBar;
        this.hideBottomNav = hideBottomNav;
      });
    }
  }

  /** On mobile, scroll the full header away so the results get the screen. */
  private revealResults() {
    if (!window.matchMedia?.(MOBILE_QUERY).matches) {
      return;
    }
    setTimeout(() => {
      const headerHeight = this.headerEl?.nativeElement.offsetHeight ?? 0;
      // Stop right under the slim bar so the results title stays visible.
      const target = Math.max(headerHeight - this.compactBarHeight(), 0);
      if (window.scrollY < target) {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }, 50);
  }

  private compactBarHeight(): number {
    return this.compactBar?.nativeElement.offsetHeight ?? 60;
  }

  private goHome() {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }
}
