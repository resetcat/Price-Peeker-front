import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs';
import { CategoryDTO, ParentCategoryDTO } from '../models/category.dto';
import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products.service';

const SALE_CATEGORY = 'Akcijas';
const PINNED_CATEGORIES = [SALE_CATEGORY, 'Alkohols'];

/** Category list used in the desktop sidebar and the mobile drawer. */
@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
})
export class CategoryNavComponent implements OnInit {
  @Input() showTitle = true;
  @Output() selected = new EventEmitter<number>();

  categories: ParentCategoryDTO[] = [];
  loading = true;
  error = false;
  activeId$ = this.productService.categoryId.asObservable();
  private expanded = new Set<number>();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getAllCategories()
      .pipe(first())
      .subscribe({
        next: (categories) => {
          this.categories = this.reorderCategories(categories);
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to fetch categories', error);
          this.error = true;
          this.loading = false;
        },
      });
  }

  isSale(category: CategoryDTO): boolean {
    return category.name === SALE_CATEGORY;
  }

  hasChildren(category: ParentCategoryDTO): boolean {
    return !!category.categories && category.categories.length > 0;
  }

  isExpanded(category: ParentCategoryDTO): boolean {
    return this.expanded.has(category.id);
  }

  toggle(category: ParentCategoryDTO) {
    if (this.expanded.has(category.id)) {
      this.expanded.delete(category.id);
    } else {
      this.expanded.add(category.id);
    }
  }

  select(category: CategoryDTO) {
    this.productService.getCategory(category.id, 1, category.name);
    this.selected.emit(category.id);
  }

  private reorderCategories(categories: ParentCategoryDTO[]): ParentCategoryDTO[] {
    const pinned = PINNED_CATEGORIES.map((name) =>
      categories.find((category) => category.name === name)
    ).filter((category): category is ParentCategoryDTO => !!category);
    const others = categories.filter(
      (category) => !PINNED_CATEGORIES.includes(category.name)
    );
    return [...pinned, ...others];
  }
}
