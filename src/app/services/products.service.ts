import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDto } from '../models/search.dto';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from '../models/products.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();
  loading = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getProducts(query: string) {
    this.loading.next(true); // Start loading
    const body: SearchDto = { query: query };
    console.log('trying to reach ' + environment.apiUrl);

    this.httpClient
      .post<ProductDto[]>(`${environment.apiUrl}/grocery`, body)
      .subscribe({
        next: (data) => {
          this.productsSource.next(data);
        },
        error: (error) => {
          console.error(error);
          this.productsSource.next([]);
        },
        complete: () => this.loading.next(false), // Stop loading,
      });
  }
}
