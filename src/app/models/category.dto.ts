export interface CategoryDTO {
  id: number;
  name: string;
}

export interface ParentCategoryDTO {
  id: number;
  name: string;
  categories: CategoryDTO[];
}

export interface CategoryUrlDTO {
  url: string;
  shop: ShopDTO;
}

export interface ShopDTO {
  id: number;
  name: string;
}
