import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/models/products.dto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((data) => {
      this.products = data;
    });
  }
}
