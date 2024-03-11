import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoryService } from '../services/category.service';
import { CategoryDTO, ParentCategoryDTO } from '../models/category.dto';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  searchQuery: string = '';
  loading$ = this.productService.loading.asObservable();
  categories: any[] = [];
  drawerOpen: boolean = false;

  private groceryShops = [1, 2];
  private spiritShops = [10, 11, 12, 13, 14];
  selectedShops: number[] = this.groceryShops;
  currentShopType: 'grocery' | 'spirit' = 'grocery';

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initializeTheme();
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService
      .getAllCategories()
      .pipe(first())
      .subscribe({
        next: (categories: any) => {
          this.categories = this.reorderCategories(categories);
        },
        error: (error) => {
          console.error('Failed to fetch categories', error);
        },
      });
  }

  reorderCategories(categories: ParentCategoryDTO[]) {
    const akcijas = categories.find(
      (category: CategoryDTO) => category.name === 'Akcijas'
    );
    const alkohols = categories.find(
      (category: CategoryDTO) => category.name === 'Alkohols'
    );
    const others = categories.filter(
      (category: CategoryDTO) =>
        category.name !== 'Akcijas' && category.name !== 'Alkohols'
    );

    const ordered = [akcijas, alkohols, ...others].filter(Boolean);
    return ordered;
  }

  categorySelect(id: number): void {
    this.productService.getCategory(id);
    this.drawerOpen = false;
  }

  selectShopType(type: 'grocery' | 'spirit') {
    this.currentShopType = type;
    this.selectedShops =
      type === 'grocery' ? this.groceryShops : this.spiritShops;
  }

  getProducts(query: string) {
    this.productService.getProducts(this.searchQuery, this.selectedShops);
    this.drawerOpen = false;
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
