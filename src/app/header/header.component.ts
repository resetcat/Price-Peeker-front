import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  getProducts() {
    this.productService.getProducts();
  }

  initializeTheme() {
    const theme = localStorage.getItem('theme') || 'cupcake';
    document.body.setAttribute('data-theme', theme);
    this.isDarkTheme = theme === 'business';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const newTheme = this.isDarkTheme ? 'business' : 'cupcake';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
