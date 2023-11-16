import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDto } from '../models/search.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpclient: HttpClient) {}

  getProducts(query: string) {
    const body: SearchDto = {
      query: query,
    };
    this.httpclient
      .post('http://localhost:3080/grocery', body)
      .subscribe((v) => console.info(v));
  }
}
