import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDto, SearchState } from '../models/search.dto';
import { BehaviorSubject, catchError, Observable, Subscription } from 'rxjs';
import { ProductDto } from '../models/products.dto';
import { NutritionDto } from '../models/nutrition.dto';
import { environment } from 'src/environments/environment';

/** What the current result list is: a search query or a category. */
export interface ResultContext {
  kind: 'search' | 'category';
  label: string;
}

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
  resultContext = new BehaviorSubject<ResultContext | null>(null);
  /**
   * Which URL state the current results belong to (set by the results page),
   * so coming back to the same URL doesn't load the same results again.
   */
  currentKey: string | null = null;
  private request?: Subscription;

  constructor(private httpClient: HttpClient) {}

  /** Back to the start screen: no results, nothing loading. */
  clear() {
    this.request?.unsubscribe();
    this.productsSource.next([]);
    this.searchState.next(SearchState.Initial);
    this.categoryId.next(null);
    this.resultContext.next(null);
    this.errorSource.next(null);
    this.loading.next(false);
  }

  getProducts(query: string, shops: number[]) {
    // A newer request replaces an older one still in flight.
    this.request?.unsubscribe();
    this.loading.next(true); // Start loading
    this.resultContext.next({ kind: 'search', label: query });
    const body: SearchDto = { query: query, shops: shops };

    this.request = this.httpClient
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

  getCategory(id: number, page: number = 1, label?: string) {
    this.request?.unsubscribe();
    this.loading.next(true);
    if (label) {
      this.resultContext.next({ kind: 'category', label });
    }
    this.request = this.httpClient
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

  getNutrition(product: ProductDto): Observable<NutritionDto> {
    return this.httpClient.get<NutritionDto>(
      `${environment.apiUrl}/nutrition`,
      {
        params: { shop: product.id, code: product.productCode ?? '' },
      }
    );
  }

  // Only Rimi (1) and Maxima (2) provide nutrition info.
  hasNutritionInfo(product: ProductDto): boolean {
    return (product.id === 1 || product.id === 2) && !!product.productCode;
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
