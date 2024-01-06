import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDto, SearchState } from '../models/search.dto';
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
  private searchState = new BehaviorSubject<SearchState>(SearchState.Initial);
  searchState$ = this.searchState.asObservable();

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
          this.searchState.next(
            data.length > 0 ? SearchState.Found : SearchState.NotFound
          );
        },
        error: (error) => {
          console.error(error);
          this.productsSource.next([]);
          this.searchState.next(SearchState.NotFound);
        },
        complete: () => this.loading.next(false), // Stop loading,
      });
  }
}
