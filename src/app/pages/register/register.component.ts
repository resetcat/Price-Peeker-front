import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  repeatedPassword: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  /** Error to show: a translation key, or the server's own message when it sends one. */
  errorKey: string | null = null;
  errorText: string | null = null;

  constructor(private router: Router, private httpClient: HttpClient) {}

  submit() {
    if (this.password !== this.repeatedPassword) {
      this.showLoginError('auth.passwordsMismatch');
      return;
    }

    this.httpClient
      .post<any>(`${environment.apiUrl}/users`, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.showLoginSuccess();
          } else {
            this.showLoginError('auth.registerError', response.message);
          }
        },
        error: (error) => {
          this.showLoginError('auth.registerError', error?.error?.message);
        },
      });
  }

  private showLoginError(key: string, serverMessage?: string) {
    this.showError = true;
    this.errorKey = key;
    this.errorText = serverMessage || null;
    setTimeout(() => (this.showError = false), 3000);
  }

  private showLoginSuccess() {
    this.showSuccess = true;
    this.username = '';
    this.password = '';
    this.repeatedPassword = '';
    setTimeout(
      () => (
        (this.showSuccess = false),
        this.router.navigate(['/login'], { queryParamsHandling: 'preserve' })
      ),
      3000
    );
  }
}
