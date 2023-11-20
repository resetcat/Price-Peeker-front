export interface ProductDto {
  id: number;
  name: string;
  imgURL: string;
  discount?: string;
  originalPrice: number;
  discountedPrice?: number;
  pricePerUnit: string;
  cardOwnerOnly?: boolean;
}
