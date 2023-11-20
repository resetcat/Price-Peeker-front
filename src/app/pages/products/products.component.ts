import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/models/products.dto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [
    {
      id: 1,
      name: 'Selerijas sakne kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_217120_KGM_LV',
      originalPrice: 1.49,
      pricePerUnit: '1.49€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Selerijas ar jūras kāpostiem 200g',
      imgURL:
        'https://cdn.barbora.lv/products/f1384e9b-4f25-4ceb-acfc-5f0eca339b0e_s.png',
      originalPrice: 1.69,
      pricePerUnit: '8.45€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Seleriju kāti I Love Eco 300g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_915029_PCE_LV',
      originalPrice: 1.99,
      pricePerUnit: '6.63€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Marinētas selerijas SMAK rīvētas 300g',
      imgURL:
        'https://cdn.barbora.lv/products/cadd67a5-f13d-462d-bdf0-91a678f95c87_s.png',
      originalPrice: 1.39,
      pricePerUnit: '4.63€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Seleriju saknes kg',
      imgURL:
        'https://cdn.barbora.lv/products/961baf8e-54be-4dd1-871a-800c8ea91eae_s.png',
      originalPrice: 1.49,
      pricePerUnit: '1.49€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Seleriju kāti gab.',
      imgURL:
        'https://cdn.barbora.lv/products/67429b52-de33-4b42-9334-cbf81509b95b_s.png',
      originalPrice: 1.49,
      pricePerUnit: '1.49€/gab.',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Svaigo kāpostu salāti ar seleriju 150g',
      imgURL:
        'https://cdn.barbora.lv/products/5b8d260b-746e-43ad-a97d-a5f2cf7fba61_s.png',
      originalPrice: 0,
      pricePerUnit: '',
      cardOwnerOnly: false,
    },
  ];
  loading$ = this.productService.loading.asObservable();

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((data) => {
      this.products = data;
    });
  }
}
