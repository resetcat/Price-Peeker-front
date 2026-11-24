import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParentCategoryDTO } from '../models/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // Shared so the desktop sidebar and the mobile drawer make one request.
  private categories$ = this.httpClient
    .get<ParentCategoryDTO[]>(`${environment.apiUrl}/allCategories`)
    .pipe(shareReplay(1));

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<ParentCategoryDTO[]> {
    return this.categories$;
  }
}
