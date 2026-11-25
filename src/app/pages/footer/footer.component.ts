import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Params, Router } from '@angular/router';
import { returnUrlParams } from 'src/app/config/search-params';
import { TelegramInsctructionComponent } from '../modals/telegram-insctruction/telegram-insctruction.component';
import { NotificationModalComponent } from '../modals/notification-modal/notification-modal.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FooterComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  /** Links to /login carry the current page, so login brings you back. */
  get loginParams(): Params | null {
    return returnUrlParams(this.router.url);
  }

  openTelegramInstructions() {
    this.dialog.open(TelegramInsctructionComponent);
  }

  openNotifications() {
    this.dialog.open(NotificationModalComponent, { data: null });
  }
}
