import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-telegram-insctruction',
  templateUrl: './telegram-insctruction.component.html',
  styleUrls: ['./telegram-insctruction.component.css'],
})
export class TelegramInsctructionComponent {
  constructor(public dialogRef: MatDialogRef<TelegramInsctructionComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
