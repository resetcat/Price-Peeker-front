import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    this.httpClient
      .post<{ accessToken: string }>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.accessToken);
          this.isLoggedIn.next(true);
        },
        error: (error) => {
          console.error('Authentication failed:', error);
        },
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn.next(false);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Optionally validate token
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  validateToken(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.isLoggedIn.next(false);
      return;
    }

    this.httpClient
      .get<{ isValid: boolean }>(`${environment.apiUrl}/auth/validateToken`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (respone) => this.isLoggedIn.next(true),
        error: (error) => this.isLoggedIn.next(false),
      });
  }
}
