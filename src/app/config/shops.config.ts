/**
 * Single place that describes the shops and the store-type switch in the header.
 *
 * Adding a new store type (e.g. Aptiekas / pharmacy):
 *   1. add its shops to SHOPS with `type: 'pharmacy'`
 *   2. uncomment the 'pharmacy' entry in SHOP_TYPES
 * The header switch, shop tags, loyalty-card labels and filter chips pick it up
 * automatically — no template or Tailwind changes needed.
 */

export type ShopTypeId = 'grocery' | 'spirit' | 'pharmacy';
export type ShopTypeIcon = 'basket' | 'bottle' | 'pill';

export interface ShopInfo {
  id: number;
  name: string;
  type: ShopTypeId;
  /** Brand colour used for the shop tag. */
  color: string;
  /** Text colour on the tag; defaults to white. */
  ink?: string;
  /** Label for card-only prices, e.g. "R-karti" → "Tikai ar R-karti". */
  loyaltyCard?: string;
}

export interface ShopType {
  id: ShopTypeId;
  label: string;
  icon: ShopTypeIcon;
}

export const SHOPS: ShopInfo[] = [
  { id: 1, name: 'R-shop', type: 'grocery', color: '#b70f15', loyaltyCard: 'R-karti' },
  { id: 2, name: 'M-shop', type: 'grocery', color: '#1b458f', loyaltyCard: 'M-karti' },
  { id: 10, name: 'S&V-shop', type: 'spirit', color: '#e53011' },
  { id: 11, name: 'LB-shop', type: 'spirit', color: '#f29300', ink: '#1a1206' },
  { id: 12, name: 'V-shop', type: 'spirit', color: '#862149' },
  { id: 13, name: 'AO-shop', type: 'spirit', color: '#990044' },
  { id: 14, name: 'SA-shop', type: 'spirit', color: '#c04c0c' },
  // Pharmacies go here, e.g.:
  // { id: 20, name: 'A-shop', type: 'pharmacy', color: '#00875a' },
];

export const SHOP_TYPES: ShopType[] = [
  { id: 'grocery', label: 'Pārtika', icon: 'basket' },
  { id: 'spirit', label: 'Alkohols', icon: 'bottle' },
  // { id: 'pharmacy', label: 'Aptiekas', icon: 'pill' },
];

const FALLBACK_SHOP_COLOR = '#6e6175';

export function getShop(id: number): ShopInfo {
  return (
    SHOPS.find((shop) => shop.id === id) ?? {
      id,
      name: 'Veikals',
      type: 'grocery',
      color: FALLBACK_SHOP_COLOR,
    }
  );
}

export function getShopIds(type: ShopTypeId): number[] {
  return SHOPS.filter((shop) => shop.type === type).map((shop) => shop.id);
}
