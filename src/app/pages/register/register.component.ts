import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  repeatedPassword: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private httpClient: HttpClient) {}

  submit() {
    if (this.password !== this.repeatedPassword) {
      this.showLoginError('Passwords do not match.');
      this.errorMessage = 'Passwords do not match.';
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
            this.showLoginError(response.message);
          }
        },
        error: (error) => {
          this.showLoginError(error.error.message || 'Registration failed.');
        },
      });
  }

  private showLoginError(message: string) {
    this.showError = true;
    this.errorMessage = message;
    setTimeout(() => (this.showError = false), 3000);
  }

  private showLoginSuccess() {
    this.showSuccess = true;
    this.username = '';
    this.password = '';
    this.repeatedPassword = '';
    setTimeout(
      () => ((this.showSuccess = false), this.router.navigate(['/login'])),
      3000
    );
  }
}
