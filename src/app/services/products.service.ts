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
  categoryId = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}

  getProducts(query: string, shops: number[]) {
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
          this.categoryId.next(null);
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

  getCategory(id: number, page: number = 1) {
    this.loading.next(true);
    this.httpClient
      .get<ProductDto[]>(`${environment.apiUrl}/category?id=${id}&page=${page}`)
      .subscribe({
        next: (data) => {
          this.urlFixForSnV(data);
          this.productsSource.next(data); // Assuming the structure is compatible
          this.searchState.next(
            data.length > 0 ? SearchState.Found : SearchState.NotFound
          );
          this.categoryId.next(id);
          this.errorSource.next(null);
        },
        error: (error) => {
          this.productsSource.next([]);
          this.searchState.next(SearchState.NotFound);
          this.loading.next(false);
          this.errorSource.next(error);
        },
        complete: () => this.loading.next(false),
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
