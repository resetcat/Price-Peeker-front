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
    const body: SearchDto = { query: query, shops: shops };
    this.fetchData(`${environment.apiUrl}/grocery`, 'post', body);
  }

  getCategory(id: number, page: number = 1) {
    const params = `?id=${id}&page=${page}`;
    this.fetchData(`${environment.apiUrl}/category${params}`, 'get');
  }

  private fetchData(url: string, method: 'get' | 'post', body?: any) {
    this.loading.next(true);
    const request =
      method === 'get'
        ? this.httpClient.get<ProductDto[]>(url)
        : this.httpClient.post<ProductDto[]>(url, body);

    request.subscribe({
      next: (data) => {
        this.urlFixForSnV(data);
        this.productsSource.next(data);
        this.searchState.next(
          data.length > 0 ? SearchState.Found : SearchState.NotFound
        );
        this.categoryId.next(method === 'get' ? body?.id : null);
        this.errorSource.next(null);
      },
      error: (error) => {
        this.productsSource.next([]);
        this.searchState.next(SearchState.NotFound);
        this.errorSource.next(error);
      },
      complete: () => this.loading.next(false),
    });
  }

  private urlFixForSnV(data: ProductDto[]) {
    data.forEach((product) => {
      if (product.id === 10) {
        product.imgURL = `${environment.apiUrl}/image-proxy?url=${product.imgURL}`;
      }
    });
  }
}
