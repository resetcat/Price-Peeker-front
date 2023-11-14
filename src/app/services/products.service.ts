import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpclient: HttpClient) {}

  getProducts() {
    this.httpclient
      .get('http://localhost:3080', { responseType: 'text' })
      .subscribe((v) => console.info(v));
  }
}
