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
      name: 'Maltā kafija Lavazza oro 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_171148_PCE_LV',
      originalPrice: 13.99,
      pricePerUnit: '27.98€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Ekoloģiskā kafija NATURELA 100g',
      imgURL:
        'https://cdn.barbora.lv/products/1a67f0ee-3139-480d-8264-fbc660883235_s.png',
      originalPrice: 9.99,
      discountedPrice: 8.29,
      pricePerUnit: '82.9€/kg',
      cardOwnerOnly: true,
      discount: '17%',
    },
    {
      id: 1,
      name: 'Maltā kafija Dallmayr Prodomo 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_149034_PCE_LV',
      originalPrice: 11.38,
      pricePerUnit: '22.76€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija J.M. PRÄSIDENT 500g',
      imgURL:
        'https://cdn.barbora.lv/products/787c56a5-77bf-4bec-aed2-c11ecc3ae3b0_s.png',
      originalPrice: 11.47,
      pricePerUnit: '22.94€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Malta kafija Lofbergs medium roast 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_186362_PCE_LV',
      originalPrice: 8.49,
      pricePerUnit: '16.98€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija J.M. JUBILÄUM 500g',
      imgURL:
        'https://cdn.barbora.lv/products/24321c3a-fa44-4e11-a296-58b4ff05d6b9_s.png',
      originalPrice: 13.85,
      pricePerUnit: '27.7€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Merrild in-cup 400g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_168891_PCE_LV',
      originalPrice: 7.39,
      pricePerUnit: '18.47€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija J.M. PRÄSIDENT 250g',
      imgURL:
        'https://cdn.barbora.lv/products/a53b0986-3893-4ae0-8d56-becadb69171e_s.png',
      originalPrice: 6.78,
      pricePerUnit: '27.12€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Paulig Classic 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_123656_PCE_LV',
      originalPrice: 8.49,
      discountedPrice: 4.99,
      pricePerUnit: '16.98€/kg',
      cardOwnerOnly: true,
      discount: '41%',
    },
    {
      id: 2,
      name: 'Maltā kafija J.M. JUBILÄUM 250g',
      imgURL:
        'https://cdn.barbora.lv/products/9c85a851-c428-42c6-a0cb-a7e62423a609_s.png',
      originalPrice: 6.78,
      pricePerUnit: '27.12€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Merrild in-cup 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_168870_PCE_LV',
      originalPrice: 8.29,
      discountedPrice: 4.99,
      pricePerUnit: '16.58€/kg',
      cardOwnerOnly: true,
      discount: '40%',
    },
    {
      id: 2,
      name: 'Malta kafija ROMBOUTS CARAT 250g',
      imgURL:
        'https://cdn.barbora.lv/products/4997b6dc-1024-4ce1-a0ca-23ef9e4f8c73_s.png',
      originalPrice: 12.49,
      pricePerUnit: '49.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Lavazza crema e aroma 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_155242_PCE_LV',
      originalPrice: 24.99,
      pricePerUnit: '24.99€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija PAULIG CLASSIC 250g',
      imgURL:
        'https://cdn.barbora.lv/products/701c1c00-b77d-4f37-9642-a118a9f87266_s.png',
      originalPrice: 4.94,
      pricePerUnit: '19.76€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Lofbergs Kharisma 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_160255_PCE_LV',
      originalPrice: 8.29,
      discountedPrice: 4.69,
      pricePerUnit: '16.58€/kg',
      cardOwnerOnly: true,
      discount: '43%',
    },
    {
      id: 2,
      name: 'Maltā kafija DALLMAYR Prodomo 250g',
      imgURL:
        'https://cdn.barbora.lv/products/cb50cced-22f1-4221-ac97-c70aabbc782a_s.png',
      originalPrice: 6.29,
      discountedPrice: 4.49,
      pricePerUnit: '17.96€/kg',
      cardOwnerOnly: true,
      discount: '29%',
    },
    {
      id: 1,
      name: 'Maltā kafija Rimi bez kofeīna 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_802331_PCE_LV',
      originalPrice: 3.69,
      discountedPrice: 2.79,
      pricePerUnit: '14.76€/kg',
      cardOwnerOnly: true,
      discount: '24%',
    },
    {
      id: 2,
      name: 'Malta kafija KONIGSTERN BESSER 250g',
      imgURL:
        'https://cdn.barbora.lv/products/452e5dff-e898-4a1a-adee-a04b99f3b4be_s.png',
      originalPrice: 3.99,
      discountedPrice: 2.39,
      pricePerUnit: '9.56€/kg',
      cardOwnerOnly: true,
      discount: '40%',
    },
    {
      id: 1,
      name: 'Maltā kafija Lavazza oro metāla kārbā 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_113602_PCE_LV',
      originalPrice: 8.99,
      pricePerUnit: '35.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija NESCAFE GOLD 200g',
      imgURL:
        'https://cdn.barbora.lv/products/f5511b88-b3a8-453f-a43e-cb35c8e7b2c0_s.png',
      originalPrice: 13.85,
      discountedPrice: 8.49,
      pricePerUnit: '42.45€/kg',
      cardOwnerOnly: true,
      discount: '39%',
    },
    {
      id: 1,
      name: 'Maltā kafija Brazil Selection 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_804468_PCE_LV',
      originalPrice: 6.49,
      pricePerUnit: '25.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija JACOBS KRONUNG 2x200g',
      imgURL:
        'https://cdn.barbora.lv/products/c2fb696b-bbfb-4809-9b28-0ac941811926_s.png',
      originalPrice: 25.99,
      discountedPrice: 12.99,
      pricePerUnit: '32.48€/kg',
      cardOwnerOnly: true,
      discount: '50%',
    },
    {
      id: 1,
      name: 'Maltā kafija Merrild in-cup 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_168869_PCE_LV',
      originalPrice: 3.25,
      pricePerUnit: '13.00€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija PAULIG Mokka 475g',
      imgURL:
        'https://cdn.barbora.lv/products/3f2c614f-e6c5-4230-a1e9-9c6810e86743_s.png',
      originalPrice: 7.91,
      pricePerUnit: '16.65€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Colombia Selection 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_804467_PCE_LV',
      originalPrice: 6.49,
      pricePerUnit: '25.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija BORBONE DECISA 2x250g',
      imgURL:
        'https://cdn.barbora.lv/products/404e3c15-3c6e-4da4-af60-2079eec3ba76_s.png',
      originalPrice: 7.99,
      discountedPrice: 5.79,
      pricePerUnit: '11.58€/kg',
      cardOwnerOnly: true,
      discount: '28%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Lavazza oro 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_111034_PCE_LV',
      originalPrice: 26.99,
      pricePerUnit: '26.99€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija BORBONE NOBILE 2x250g',
      imgURL:
        'https://cdn.barbora.lv/products/ba2696aa-1dba-435c-a53e-9407df46f158_s.png',
      originalPrice: 7.99,
      discountedPrice: 5.79,
      pricePerUnit: '11.58€/kg',
      cardOwnerOnly: true,
      discount: '28%',
    },
    {
      id: 1,
      name: 'Maltā kafija Ethiopia Selection 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_804469_PCE_LV',
      originalPrice: 6.49,
      pricePerUnit: '25.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta Kafija BKI Guld 500g',
      imgURL:
        'https://cdn.barbora.lv/products/15e46139-72c9-4590-a2bf-bd0d8c7307fe_s.png',
      originalPrice: 9.59,
      discountedPrice: 5.89,
      pricePerUnit: '11.78€/kg',
      cardOwnerOnly: true,
      discount: '39%',
    },
    {
      id: 1,
      name: 'Maltā kafija Jacobs Kronung 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_100227_PCE_LV',
      originalPrice: 9.49,
      pricePerUnit: '18.98€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija TCHIBO EXCLUSIVE 250g',
      imgURL:
        'https://cdn.barbora.lv/products/8c4f45c8-7a32-45d1-98b4-57c3329d520f_s.png',
      originalPrice: 5.49,
      discountedPrice: 3.49,
      pricePerUnit: '13.96€/kg',
      cardOwnerOnly: true,
      discount: '36%',
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Rimi bez kofeīna 100g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_801656_PCE_LV',
      originalPrice: 4.99,
      pricePerUnit: '49.90€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija LIEPĀJA klasiskā 100g',
      imgURL:
        'https://cdn.barbora.lv/products/3ab9572e-91e7-4461-aa20-c6e7c0e9ead2_s.png',
      originalPrice: 2.56,
      discountedPrice: 2.29,
      pricePerUnit: '22.9€/kg',
      cardOwnerOnly: true,
      discount: '11%',
    },
    {
      id: 1,
      name: 'Maltā kafija I Love Eco Peru 450g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_810992_PCE_LV',
      originalPrice: 9.99,
      pricePerUnit: '22.20€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija PAULIG PRESIDENTTI 500g',
      imgURL:
        'https://cdn.barbora.lv/products/b7436245-9e1e-4f05-809c-feca1261d299_s.png',
      originalPrice: 9.2,
      discountedPrice: 6.09,
      pricePerUnit: '12.18€/kg',
      cardOwnerOnly: true,
      discount: '34%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Lofbergs Medium Roast 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_177824_PCE_LV',
      originalPrice: 23.69,
      pricePerUnit: '23.69€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija NESCAFE CLASSIC 100g',
      imgURL:
        'https://cdn.barbora.lv/products/be78c548-bef7-4ba7-bc4f-f5fead20ebd5_s.png',
      originalPrice: 5.24,
      discountedPrice: 3.59,
      pricePerUnit: '35.9€/kg',
      cardOwnerOnly: true,
      discount: '31%',
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Liepāja klasiskā 100g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_111413_PCE_LV',
      originalPrice: 2.55,
      pricePerUnit: '25.50€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija JACOBS KRONUNG 250g',
      imgURL:
        'https://cdn.barbora.lv/products/8f35f0fd-daa2-4f43-88ef-3f6d61fc3975_s.png',
      originalPrice: 5.1,
      pricePerUnit: '20.4€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Lavazza oro 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_111032_PCE_LV',
      originalPrice: 7.79,
      pricePerUnit: '31.16€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija JACOBS KRONUNG 500g',
      imgURL:
        'https://cdn.barbora.lv/products/eb44db53-8e57-4187-808b-61f21fce0350_s.png',
      originalPrice: 9.4,
      pricePerUnit: '18.8€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Jacobs Kronung 200g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_124199_PCE_LV',
      originalPrice: 13.55,
      pricePerUnit: '67.75€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija JACOBS AROMA 100g',
      imgURL:
        'https://cdn.barbora.lv/products/0dac38cb-1690-4b2a-9f07-2a4ac082627f_s.png',
      originalPrice: 4.59,
      discountedPrice: 3.44,
      pricePerUnit: '34.4€/kg',
      cardOwnerOnly: false,
      discount: '25%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Selection Brazil 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_811588_PCE_LV',
      originalPrice: 23.99,
      pricePerUnit: '23.99€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija JACOBS AROMA 200g',
      imgURL:
        'https://cdn.barbora.lv/products/405b6230-1004-4c6f-ae24-d20c12e548f4_s.png',
      originalPrice: 7.49,
      discountedPrice: 5.62,
      pricePerUnit: '28.1€/kg',
      cardOwnerOnly: false,
      discount: '25%',
    },
    {
      id: 1,
      name: 'Kafijas kapsulas Nescafe Lungo 16x6,5g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_199826_PCE_LV',
      originalPrice: 6.59,
      discountedPrice: 4.99,
      pricePerUnit: '0.41€/gab.',
      cardOwnerOnly: true,
      discount: '24%',
    },
    {
      id: 2,
      name: 'Pupiņu kafija PAULIG ARABICA 1kg',
      imgURL:
        'https://cdn.barbora.lv/products/b08be490-8cd9-431f-9b90-a2906a69b330_s.png',
      originalPrice: 22.27,
      discountedPrice: 12.99,
      pricePerUnit: '12.99€/kg',
      cardOwnerOnly: true,
      discount: '42%',
    },
    {
      id: 1,
      name: 'Kafijas krējums Ciba 10gx10gab.',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_212228_PCE_LV',
      originalPrice: 0.49,
      pricePerUnit: '4.90€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija JACOBS KRONUNG 100g',
      imgURL:
        'https://cdn.barbora.lv/products/083e92eb-ab97-4a6b-adfd-f400ba1926dd_s.png',
      originalPrice: 3.26,
      pricePerUnit: '32.6€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Lofbergs Prezzo 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_100765_PCE_LV',
      originalPrice: 8.49,
      pricePerUnit: '16.98€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Pupiņu kafija LAVAZZA ROSSA 1kg',
      imgURL:
        'https://cdn.barbora.lv/products/1448bfb8-80a3-4d97-9571-012c41223a6c_s.png',
      originalPrice: 24.74,
      discountedPrice: 15.99,
      pricePerUnit: '15.99€/kg',
      cardOwnerOnly: true,
      discount: '35%',
    },
    {
      id: 1,
      name: 'Maltā kafija I Love Eco 450g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_810990_PCE_LV',
      originalPrice: 9.99,
      pricePerUnit: '22.20€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija JACOBS KRONUNG 200g',
      imgURL:
        'https://cdn.barbora.lv/products/fb3d71fd-cb90-4847-a3ea-4be2b4601071_s.png',
      originalPrice: 13.55,
      discountedPrice: 10.16,
      pricePerUnit: '50.8€/kg',
      cardOwnerOnly: false,
      discount: '25%',
    },
    {
      id: 1,
      name: "Kafijas pupiņas Dallmayr crema d'oro 1kg",
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_187254_PCE_LV',
      originalPrice: 27.99,
      pricePerUnit: '27.99€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija PAULIG CLASSIC 500g',
      imgURL:
        'https://cdn.barbora.lv/products/e91c5a08-fd3c-479c-bd8d-c0d6434c71a5_s.png',
      originalPrice: 8.41,
      discountedPrice: 5.69,
      pricePerUnit: '11.38€/kg',
      cardOwnerOnly: true,
      discount: '32%',
    },
    {
      id: 1,
      name: 'Maltā kafija Jacobs Kronung bez kofeīna 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_126546_PCE_LV',
      originalPrice: 6.99,
      pricePerUnit: '27.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija AROMA GOLD 250g',
      imgURL:
        'https://cdn.barbora.lv/products/36077c63-ddfb-46fc-8ed5-3dd76e8cd27a_s.png',
      originalPrice: 5.49,
      pricePerUnit: '21.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: "Kafijas kapsulas L'or profondo 10 gabali",
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_186430_PCE_LV',
      originalPrice: 4.89,
      pricePerUnit: '94.04€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija AROMA GOLD 100g',
      imgURL:
        'https://cdn.barbora.lv/products/0ada926a-d0c7-412a-844d-a87e420e2d2c_s.png',
      originalPrice: 5.99,
      discountedPrice: 4.49,
      pricePerUnit: '44.9€/kg',
      cardOwnerOnly: false,
      discount: '25%',
    },
    {
      id: 1,
      name: 'Šķ. kafijas dzēr. Nescafe 3in1 10x16,5g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_193838_PCE_LV',
      originalPrice: 2.89,
      pricePerUnit: '17.52€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija PELLINI TOP 250g',
      imgURL:
        'https://cdn.barbora.lv/products/2f4909ae-558c-4a4a-9502-128963d92525_s.png',
      originalPrice: 10.88,
      discountedPrice: 6.99,
      pricePerUnit: '27.96€/kg',
      cardOwnerOnly: true,
      discount: '36%',
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Rimi granulēta 200g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_801148_PCE_LV',
      originalPrice: 5.4,
      pricePerUnit: '27.00€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija AROMA GOLD 200g',
      imgURL:
        'https://cdn.barbora.lv/products/ce01e320-5954-4d43-9d1d-f7c341ad7ffb_s.png',
      originalPrice: 10.48,
      discountedPrice: 7.86,
      pricePerUnit: '39.3€/kg',
      cardOwnerOnly: false,
      discount: '25%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas I Love Eco Peru 450g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_810991_PCE_LV',
      originalPrice: 11.49,
      pricePerUnit: '25.53€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'BIO maltā kafija NATURELA 250g',
      imgURL:
        'https://cdn.barbora.lv/products/e4754d3b-369d-45d2-a628-17df01513d86_s.png',
      originalPrice: 6.99,
      discountedPrice: 5.39,
      pricePerUnit: '21.56€/kg',
      cardOwnerOnly: true,
      discount: '23%',
    },
    {
      id: 1,
      name: 'Kafijas kap. Dolce Gusto Flat White 187,2g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_193024_PCE_LV',
      originalPrice: 7.29,
      discountedPrice: 4.99,
      pricePerUnit: '38.98€/kg',
      cardOwnerOnly: true,
      discount: '32%',
    },
    {
      id: 2,
      name: 'Malta kafija LAVAZZA CLUB 250g',
      imgURL:
        'https://cdn.barbora.lv/products/5e31201f-77c0-4cb0-a7f0-86fe11521b9a_s.png',
      originalPrice: 8.9,
      discountedPrice: 5.79,
      pricePerUnit: '23.16€/kg',
      cardOwnerOnly: true,
      discount: '35%',
    },
    {
      id: 1,
      name: 'Kafijas dzēriens Jacobs 3in1 20x15,2g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_165533_PCE_LV',
      originalPrice: 4.39,
      discountedPrice: 2.99,
      pricePerUnit: '14.44€/kg',
      cardOwnerOnly: true,
      discount: '32%',
    },
    {
      id: 2,
      name: 'Malta kafija LÖFBERGS KHARISMA 500g',
      imgURL:
        'https://cdn.barbora.lv/products/9cef2e10-f615-4297-8855-66a63338094f_s.png',
      originalPrice: 7.96,
      discountedPrice: 5.39,
      pricePerUnit: '10.78€/kg',
      cardOwnerOnly: true,
      discount: '32%',
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Rimi Gold 200g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_804425_PCE_LV',
      originalPrice: 6.75,
      pricePerUnit: '33.75€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija PELLINI ESPRESSO 250g',
      imgURL:
        'https://cdn.barbora.lv/products/f0a5a9c6-bde0-43c9-bc37-0ce099097a69_s.png',
      originalPrice: 8.49,
      discountedPrice: 4.99,
      pricePerUnit: '19.96€/kg',
      cardOwnerOnly: true,
      discount: '41%',
    },
    {
      id: 1,
      name: 'Kafijas kaps. Starbucks House Blend 12x8,5g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_1001031_PCE_LV',
      originalPrice: 7.29,
      pricePerUnit: '71.47€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija MERRILD GOLD 100g',
      imgURL:
        'https://cdn.barbora.lv/products/1c4c4e97-deae-4e80-8842-d40f44af3d4b_s.png',
      originalPrice: 5.93,
      discountedPrice: 3.49,
      pricePerUnit: '34.9€/kg',
      cardOwnerOnly: true,
      discount: '41%',
    },
    {
      id: 1,
      name: 'Maltā kafija Illy Espresso 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_107077_PCE_LV',
      originalPrice: 11.49,
      pricePerUnit: '45.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija DARBOVEN MOVENPICK 500g',
      imgURL:
        'https://cdn.barbora.lv/products/b5dd5d17-8c25-43a5-83d4-9e7c8a1c2511_s.png',
      originalPrice: 9.59,
      pricePerUnit: '19.18€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Malta kafija Paulig Classic Cremoso 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_1000697_PCE_LV',
      originalPrice: 8.69,
      discountedPrice: 4.99,
      pricePerUnit: '17.38€/kg',
      cardOwnerOnly: true,
      discount: '43%',
    },
    {
      id: 2,
      name: 'Malta kafija BARBERA MAGHETTO 250g',
      imgURL:
        'https://cdn.barbora.lv/products/c1bf597c-54a0-4d11-8733-b4a11eeac3bf_s.png',
      originalPrice: 6.99,
      pricePerUnit: '27.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Merrild Dansk Guld 340g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_1015274_PCE_LV',
      originalPrice: 7.29,
      pricePerUnit: '21.44€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija BARBERA PREGEVOLE 250g',
      imgURL:
        'https://cdn.barbora.lv/products/5cb2c5e9-2284-4480-a3a4-7895c362b7af_s.png',
      originalPrice: 5.99,
      pricePerUnit: '23.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Paulig Classic Crema 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_190658_PCE_LV',
      originalPrice: 22.49,
      pricePerUnit: '22.49€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Malta kafija BARBERA EUROPA 250g',
      imgURL:
        'https://cdn.barbora.lv/products/53f79bcc-9202-4241-a78c-e90faddd15d5_s.png',
      originalPrice: 5.49,
      pricePerUnit: '21.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Maltā kafija Lavazza club 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_156712_PCE_LV',
      originalPrice: 8.99,
      pricePerUnit: '35.96€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija MERRILD GOLD 200g',
      imgURL:
        'https://cdn.barbora.lv/products/0cbbf767-b956-4277-8ade-19c80fffd436_s.png',
      originalPrice: 9.89,
      discountedPrice: 5.79,
      pricePerUnit: '28.95€/kg',
      cardOwnerOnly: true,
      discount: '41%',
    },
    {
      id: 1,
      name: 'Maltā kafija Movenpick Der Himmlishce 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_141160_PCE_LV',
      originalPrice: 9.69,
      pricePerUnit: '19.38€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija AROMA PLATINUM 200g',
      imgURL:
        'https://cdn.barbora.lv/products/ccda56bd-9064-4377-89ca-8f4a9bdaf064_s.png',
      originalPrice: 10.26,
      discountedPrice: 7.7,
      pricePerUnit: '38.5€/kg',
      cardOwnerOnly: false,
      discount: '25%',
    },
    {
      id: 1,
      name: 'Kafijas kapsulas Nescafe Cafe au Lait 16x10g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_175310_PCE_LV',
      originalPrice: 7.29,
      discountedPrice: 4.99,
      pricePerUnit: '0.46€/gab.',
      cardOwnerOnly: true,
      discount: '32%',
    },
    {
      id: 2,
      name: 'Malta kafija EILLES SELECTION 500g',
      imgURL:
        'https://cdn.barbora.lv/products/4a595dad-e02c-4836-82ce-8472c3a9a1ac_s.png',
      originalPrice: 9.59,
      pricePerUnit: '19.18€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Rimi Freeze Dried 200g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_801149_PCE_LV',
      originalPrice: 6.49,
      pricePerUnit: '32.45€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija TCHIBO EXCLUSIVE 100g',
      imgURL:
        'https://cdn.barbora.lv/products/284f6a78-8fcb-4059-a286-abf8de4d89f4_s.png',
      originalPrice: 7.79,
      discountedPrice: 4.49,
      pricePerUnit: '44.9€/kg',
      cardOwnerOnly: true,
      discount: '42%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Lofbergs Kharisma 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_193753_PCE_LV',
      originalPrice: 21.77,
      discountedPrice: 11.99,
      pricePerUnit: '21.77€/kg',
      cardOwnerOnly: true,
      discount: '45%',
    },
    {
      id: 2,
      name: 'Malta kafija LAVAZZA ORO 500g',
      imgURL:
        'https://cdn.barbora.lv/products/16b04a16-6aef-428c-860b-87641a3b6e66_s.png',
      originalPrice: 13.85,
      discountedPrice: 8.99,
      pricePerUnit: '17.98€/kg',
      cardOwnerOnly: true,
      discount: '35%',
    },
    {
      id: 1,
      name: 'Maltā kafija Lavazza rossa 250g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_120328_PCE_LV',
      originalPrice: 6.89,
      pricePerUnit: '27.56€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Maltā kafija Merrild Mellemristet 400g',
      imgURL:
        'https://cdn.barbora.lv/products/732cb6bb-fd92-4235-abcf-fd262239e03c_s.png',
      originalPrice: 6.92,
      discountedPrice: 4.99,
      pricePerUnit: '12.48€/kg',
      cardOwnerOnly: true,
      discount: '28%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Guatemala Selection 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_807739_PCE_LV',
      originalPrice: 21.99,
      discountedPrice: 11.99,
      pricePerUnit: '21.99€/kg',
      cardOwnerOnly: true,
      discount: '45%',
    },
    {
      id: 2,
      name: 'Šķīstošā kafija NESCAFE GOLD 100g',
      imgURL:
        'https://cdn.barbora.lv/products/f48faf7a-eac8-4a96-97ee-87e333b8cf6a_s.png',
      originalPrice: 7.91,
      discountedPrice: 4.89,
      pricePerUnit: '48.9€/kg',
      cardOwnerOnly: true,
      discount: '38%',
    },
    {
      id: 1,
      name: 'Maltā kafija Eilles Selection 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_151825_PCE_LV',
      originalPrice: 9.69,
      pricePerUnit: '19.38€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija NESCAFE CLASSIC 200g',
      imgURL:
        'https://cdn.barbora.lv/products/fb94d939-6f60-4486-8c80-e2f28b0ebef3_s.png',
      originalPrice: 9.3,
      discountedPrice: 5.99,
      pricePerUnit: '29.95€/kg',
      cardOwnerOnly: true,
      discount: '36%',
    },
    {
      id: 1,
      name: 'Šķīstošā kafija Nescafe Classic 200g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_135273_PCE_LV',
      originalPrice: 9.39,
      pricePerUnit: '46.95€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija MERRILD CLASSIC 100g',
      imgURL:
        'https://cdn.barbora.lv/products/170966b4-f84f-43b6-9bb9-52086c5cd698_s.png',
      originalPrice: 5.49,
      discountedPrice: 2.75,
      pricePerUnit: '27.5€/kg',
      cardOwnerOnly: true,
      discount: '50%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas I Love Eco Espresso 500g',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_810995_PCE_LV',
      originalPrice: 11.49,
      pricePerUnit: '22.98€/kg',
      cardOwnerOnly: false,
    },
    {
      id: 2,
      name: 'Šķīstošā kafija MERRILD CLASSIC 200g',
      imgURL:
        'https://cdn.barbora.lv/products/6ebe0744-3609-42cf-ab82-a2da035e7e8b_s.png',
      originalPrice: 8.41,
      discountedPrice: 4.99,
      pricePerUnit: '24.95€/kg',
      cardOwnerOnly: true,
      discount: '41%',
    },
    {
      id: 1,
      name: 'Kafijas pupiņas Paulig Arabica 1kg',
      imgURL:
        'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/MAT_155726_PCE_LV',
      originalPrice: 22.49,
      discountedPrice: 12.49,
      pricePerUnit: '22.49€/kg',
      cardOwnerOnly: true,
      discount: '44%',
    },
    {
      id: 2,
      name: 'Malta kafija JACOBS SELECTION 500g',
      imgURL:
        'https://cdn.barbora.lv/products/aee45a13-82c5-4cf5-b354-3d03fff5638e_s.png',
      originalPrice: 11.08,
      pricePerUnit: '22.16€/kg',
      cardOwnerOnly: false,
    },
  ];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    // this.productService.products$.subscribe((data) => {
    //   this.products = data;
    // });
  }
}
