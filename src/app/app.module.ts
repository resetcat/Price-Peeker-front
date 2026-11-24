import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModalComponent } from './pages/modals/notification-modal/notification-modal.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { AuthInterceptor } from './guards/auth.interceptor';
import { FooterComponent } from './pages/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { TelegramInsctructionComponent } from './pages/modals/telegram-insctruction/telegram-insctruction.component';
import { IconComponent } from './shared/icon.component';
import { CategoryNavComponent } from './shared/category-nav.component';
import { PricePipe } from './pipes/price.pipe';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    NotificationModalComponent,
    FooterComponent,
    RegisterComponent,
    TelegramInsctructionComponent,
    IconComponent,
    CategoryNavComponent,
    PricePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      // Dialogs draw their own rounded card; see .pp-dialog in styles.css
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        panelClass: 'pp-dialog',
        maxWidth: '95vw',
        autoFocus: 'dialog',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
