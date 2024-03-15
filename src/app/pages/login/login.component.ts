import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.showLoginSuccess();
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.showLoginError();
      },
    });
  }
  private showLoginError() {
    this.showError = true;
    this.errorMessage = 'Error! Authentication failed.';
    setTimeout(() => (this.showError = false), 3000);
  }

  private showLoginSuccess() {
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 3000);
  }
}
