import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { safeReturnUrl } from 'src/app/config/search-params';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.showLoginSuccess();
        setTimeout(() => {
          // Back to where the user came from (e.g. their search results).
          this.router.navigateByUrl(
            safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl'))
          );
        }, 1500);
      },
      error: () => this.showLoginError(),
    });
  }
  private showLoginError() {
    this.showError = true;
    setTimeout(() => (this.showError = false), 3000);
  }

  private showLoginSuccess() {
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 3000);
  }
}
