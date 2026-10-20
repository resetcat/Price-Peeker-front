import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { NotificationDTO } from 'src/app/models/notification.dto';
import { NutritionDto } from 'src/app/models/nutrition.dto';
import { ProductDto } from 'src/app/models/products.dto';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';

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
  readonly maxNotifications = 20;

  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto,
    private notificationService: NotificationService,
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.hasNutritionInfo = this.productsService.hasNutritionInfo(this.data);

    if (this.isLoggedIn) {
      this.fetchNotifications();
    }
    if (this.hasNutritionInfo) {
      this.fetchNutrition();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.errorMessage = 'Please log in to view notifications.';
        }
      },
    });
  }

  fetchNutrition(): void {
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
      alert(`You cannot add more than ${this.maxNotifications} notifications.`);
      return;
    }
    this.notificationService.addNotification(product).subscribe((response) => {
      this.notifications.push(response);
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
