import { Params } from '@angular/router';
import { SHOP_TYPES, ShopTypeId } from './shops.config';

/**
 * Query parameters of the results page ("/"), so searches, categories and
 * filters can be refreshed, shared and navigated with the back button:
 *
 *   /?q=selerijas&type=grocery&sort=priceAsc&shop=1&deals=1
 *   /?category=12&page=2
 */
export const PARAM = {
  query: 'q',
  type: 'type',
  category: 'category',
  page: 'page',
  sort: 'sort',
  shop: 'shop',
  deals: 'deals',
} as const;

/** Store type from the URL; anything unknown falls back to the first one. */
export function parseShopType(value: string | null): ShopTypeId {
  const type = SHOP_TYPES.find((shopType) => shopType.id === value);
  return type ? type.id : SHOP_TYPES[0].id;
}

export function searchParams(query: string, type: ShopTypeId): Params {
  return { [PARAM.query]: query, [PARAM.type]: type };
}

export function categoryParams(id: number, page: number = 1): Params {
  return page > 1
    ? { [PARAM.category]: id, [PARAM.page]: page }
    : { [PARAM.category]: id };
}

/** Where to go after logging in; only paths inside this app are allowed. */
export function safeReturnUrl(value: string | null): string {
  if (
    !value ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    /^\/(login|register)\b/.test(value)
  ) {
    return '/';
  }
  return value;
}

/** Query params for links to /login that bring the user back afterwards. */
export function returnUrlParams(currentUrl: string): Params | null {
  return safeReturnUrl(currentUrl) === '/' ? null : { returnUrl: currentUrl };
}
