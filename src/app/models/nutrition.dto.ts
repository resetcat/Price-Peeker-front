export interface NutritionRowDto {
  name: string;
  value: string;
  isSubItem: boolean;
}

export interface NutritionDto {
  per?: string;
  rows: NutritionRowDto[];
}
