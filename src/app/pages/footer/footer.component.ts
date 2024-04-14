import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelegramInsctructionComponent } from '../modals/telegram-insctruction/telegram-insctruction.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(public dialog: MatDialog) {}

  openTelegramInstructions() {
    this.dialog.open(TelegramInsctructionComponent, {
      width: '250px',
    });
  }
}
