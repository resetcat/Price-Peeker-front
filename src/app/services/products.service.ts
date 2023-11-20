import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDto } from '../models/search.dto';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from '../models/products.dto';

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
    this.httpClient
      .post<ProductDto[]>('http://localhost:3080/grocery', body)
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
