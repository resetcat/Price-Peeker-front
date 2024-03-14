import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDto } from 'src/app/models/products.dto';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
})
export class NotificationModalComponent implements OnInit {
  notifications = [
    {
      shop: 1,
      name: 'test',
      date: '02.03.2024',
      price: 15.5,
    },
    {
      shop: 2,
      name: 'Selerijas ar jūras kāpostiem ',
      date: '02.04.2024',
      price: 1.8,
    },
    {
      shop: 1,
      name: 'Seleriju kāti I Love',
      date: '02.05.2024',
      price: 1.99,
    },
    {
      shop: 2,
      name: 'Marinētas selerijas SMAK rīvētas 300g',
      date: '02.06.2024',
      price: 1.22,
    },
    {
      shop: 1,
      name: 'Seleriju saknes',
      date: '02.07.2024',
      price: 1.49,
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNotification(product: ProductDto) {
    if (this.notifications.length >= 5) {
      alert('You cannot add more than 5 notifications.');
      return;
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}.${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${currentDate.getFullYear()}`;

    this.notifications.push({
      shop: product.id,
      name: product.name,
      date: formattedDate,
      price: product.originalPrice,
    });
  }

  deleteNotification(index: number): void {
    this.notifications.splice(index, 1);
  }
}
