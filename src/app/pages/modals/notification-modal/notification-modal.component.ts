import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationDTO } from 'src/app/models/notification.dto';
import { ProductDto } from 'src/app/models/products.dto';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
})
export class NotificationModalComponent implements OnInit {
  notifications: NotificationDTO[] = [];
  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  addNotification(product: ProductDto) {
    if (this.notifications.length >= 5) {
      alert('You cannot add more than 5 notifications.');
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
