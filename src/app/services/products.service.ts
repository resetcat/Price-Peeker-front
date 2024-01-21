import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDto, SearchState } from '../models/search.dto';
import { BehaviorSubject, catchError } from 'rxjs';
import { ProductDto } from '../models/products.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();
  loading = new BehaviorSubject<boolean>(false);
  private searchState = new BehaviorSubject<SearchState>(SearchState.Initial);
  searchState$ = this.searchState.asObservable();
  private errorSource = new BehaviorSubject<any>(null);
  error$ = this.errorSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  getProducts(query: string, shops: string[]) {
    this.loading.next(true); // Start loading
    const body: SearchDto = { query: query, shops: shops };

    this.httpClient
      .post<ProductDto[]>(`${environment.apiUrl}/grocery`, body)
      .subscribe({
        next: (data) => {
          this.urlFixForSnV(data);
          this.productsSource.next(data);
          this.searchState.next(
            data.length > 0 ? SearchState.Found : SearchState.NotFound
          );
          this.errorSource.next(null);
        },
        error: (error) => {
          this.productsSource.next([]);
          this.searchState.next(SearchState.NotFound);
          this.loading.next(false);
          this.errorSource.next(error);
        },
        complete: () => this.loading.next(false), // Stop loading,
      });
  }

  urlFixForSnV(data: ProductDto[]) {
    data = data.map((product) => {
      if (product.id === 10) {
        product.imgURL = `${environment.apiUrl}/image-proxy?url=${product.imgURL}`;
      }
      return product;
    });
  }
}
