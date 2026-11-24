import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { take } from 'rxjs';
import { ShopInfo, getShop } from 'src/app/config/shops.config';
import { NotificationDTO } from 'src/app/models/notification.dto';
import { NutritionDto } from 'src/app/models/nutrition.dto';
import { ProductDto } from 'src/app/models/products.dto';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
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
})
export class NotificationModalComponent implements OnInit {
  notifications: NotificationDTO[] = [];
  errorMessage: string = '';
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
    private dialog: MatDialog
  ) {}

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

  get loyaltyCardLabel(): string {
    return this.shop?.loyaltyCard ?? 'klienta karti';
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
          this.errorMessage = 'Ienāc, lai redzētu savus paziņojumus.';
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
      this.errorMessage = `Var izsekot ne vairāk kā ${this.maxNotifications} preces. Izdzēs kādu paziņojumu, lai pievienotu jaunu.`;
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
        this.errorMessage = 'Neizdevās pievienot paziņojumu.';
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
