import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        switchMap((response) => {
          if (response.status === 'error') {
            return throwError(
              () => new Error(response.message || 'Login failed')
            );
          } else {
            localStorage.setItem('access_token', response.accessToken);
            this.isLoggedIn.next(true);
            return of(response);
          }
        }),
        catchError((error) => {
          console.error('Authentication failed:', error);
          return throwError(() => new Error('Authentication failed'));
        })
      );
  }
  logout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn.next(false);
  }

  async validateToken() {
    this.httpClient
      .get<{ isValid: boolean }>(`${environment.apiUrl}/auth/validateToken`)
      .subscribe({
        next: (respone) => this.isLoggedIn.next(true),
        error: (error) => this.logout(),
      });
  }
}
