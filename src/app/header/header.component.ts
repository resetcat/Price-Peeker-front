import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  searchQuery: string = '';
  loading$ = this.productService.loading.asObservable();

  private groceryShops = [1, 2];
  private spiritShops = [10, 11, 12, 13, 14];
  selectedShops: number[] = this.groceryShops;
  currentShopType: 'grocery' | 'spirit' = 'grocery';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  selectShopType(type: 'grocery' | 'spirit') {
    this.currentShopType = type;
    this.selectedShops =
      type === 'grocery' ? this.groceryShops : this.spiritShops;
  }

  getProducts(query: string) {
    this.productService.getProducts(this.searchQuery, this.selectedShops);
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
