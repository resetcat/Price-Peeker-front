import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Params, Router } from '@angular/router';
import { take } from 'rxjs';
import { returnUrlParams } from 'src/app/config/search-params';
import { ShopInfo, getShop } from 'src/app/config/shops.config';
import { NotificationDTO } from 'src/app/models/notification.dto';
import { NutritionDto } from 'src/app/models/nutrition.dto';
import { ProductDto } from 'src/app/models/products.dto';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { LanguageService } from 'src/app/i18n/language.service';
import { nutrientKey } from 'src/app/i18n/nutrients';
import { TelegramInsctructionComponent } from '../telegram-insctruction/telegram-insctruction.component';

/**
 * Product details + the user's price alerts.
 * Opened with a product from the grid, or with `data: null` (header / footer)
 * to show only the alerts.
 */
@Component({
    selector: 'app-notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NotificationModalComponent implements OnInit {
  notifications: NotificationDTO[] = [];
  /** Translation key (and its parameters) of the error shown above the alerts. */
  errorKey: string | null = null;
  errorParams: Record<string, unknown> = {};
  isLoggedIn: boolean = false;
  hasNutritionInfo: boolean = false;
  nutrition: NutritionDto | null = null;
  nutritionLoading: boolean = false;
  nutritionError: boolean = false;
  adding: boolean = false;
  shop: ShopInfo | null = null;
  readonly maxNotifications = 20;

  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto | null,
    private notificationService: NotificationService,
    private productsService: ProductsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    public lang: LanguageService
  ) {}

  /** Log in, then come back to the results this dialog was opened from. */
  get loginParams(): Params | null {
    return returnUrlParams(this.router.url);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    if (this.data) {
      this.shop = getShop(this.data.id);
      this.hasNutritionInfo = this.productsService.hasNutritionInfo(this.data);
    }

    if (this.isLoggedIn) {
      this.fetchNotifications();
    }
    if (this.hasNutritionInfo) {
      this.fetchNutrition();
    }
  }

  /** True when this product is already in the user's alerts. */
  get isFollowing(): boolean {
    return (
      !!this.data && this.notifications.some((n) => n.name === this.data!.name)
    );
  }

  /** The shop's loyalty card, e.g. "R"; null when the shop has no named card. */
  get loyaltyCard(): string | null {
    return this.shop?.loyaltyCard ?? null;
  }

  /**
   * Nutrition rows come from the shops in Latvian. In other languages, known
   * rows get our translation key; unknown ones are shown as the shop wrote them.
   */
  nutrientLabelKey(name: string): string | null {
    return this.lang.current() === 'lv' ? null : nutrientKey(name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openTelegramInstructions(): void {
    this.dialog.open(TelegramInsctructionComponent);
  }

  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.errorKey = 'alerts.loginRequired';
        }
      },
    });
  }

  fetchNutrition(): void {
    if (!this.data) {
      return;
    }
    this.nutritionLoading = true;
    this.productsService.getNutrition(this.data).subscribe({
      next: (nutrition) => {
        this.nutrition = nutrition;
        this.nutritionLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.nutritionError = true;
        this.nutritionLoading = false;
      },
    });
  }

  addNotification(product: ProductDto) {
    if (this.notifications.length >= this.maxNotifications) {
      this.errorKey = 'alerts.limit';
      this.errorParams = { max: this.maxNotifications };
      return;
    }
    this.adding = true;
    this.notificationService.addNotification(product).subscribe({
      next: (response) => {
        this.notifications.push(response);
        this.adding = false;
      },
      error: (err) => {
        console.error(err);
        this.errorKey = 'alerts.addError';
        this.adding = false;
      },
    });
  }

  deleteNotification(index: number): void {
    const notificationId = this.notifications[index].id;
    this.notificationService
      .deleteNotification(notificationId)
      .subscribe(() => {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notificationId
        );
      });
  }
}
