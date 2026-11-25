import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  TranslatePipe,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NotificationModalComponent } from './pages/modals/notification-modal/notification-modal.component';
import { TelegramInsctructionComponent } from './pages/modals/telegram-insctruction/telegram-insctruction.component';
import { IconComponent } from './shared/icon.component';
import { CategoryNavComponent } from './shared/category-nav.component';
import { PricePipe } from './pipes/price.pipe';
import { AuthInterceptor } from './guards/auth.interceptor';
import { BundledTranslateLoader } from './i18n/translate-loader';
import { DEFAULT_LANGUAGE, LanguageService } from './i18n/language.service';

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
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    TranslatePipe,
  ],
  providers: [
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateLoader(BundledTranslateLoader),
      fallbackLang: DEFAULT_LANGUAGE,
      lang: DEFAULT_LANGUAGE,
    }),
    // Pick the visitor's language before the first render.
    provideAppInitializer(() => inject(LanguageService).init()),
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
