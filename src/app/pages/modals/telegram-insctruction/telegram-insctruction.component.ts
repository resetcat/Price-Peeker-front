import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

@Component({
  selector: 'app-telegram-insctruction',
  templateUrl: './telegram-insctruction.component.html',
  styleUrls: ['./telegram-insctruction.component.css'],
})
export class TelegramInsctructionComponent {
  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
