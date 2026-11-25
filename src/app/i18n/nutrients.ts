/**
 * Shops send nutrition rows with Latvian names ("Tauki", "Tostarp – cukurs" …).
 * In English and Russian we show our own translation of the common ones;
 * anything we don't recognise is shown as the shop wrote it.
 */
const NUTRIENT_PATTERNS: [RegExp, string][] = [
  [/piesātināt/, 'nutrition.saturates'],
  [/cukur/, 'nutrition.sugars'],
  [/enerģētisk|enerģija/, 'nutrition.energy'],
  [/ogļhidrāt/, 'nutrition.carbs'],
  [/šķiedrviel/, 'nutrition.fibre'],
  [/olbaltumviel/, 'nutrition.protein'],
  [/^sāls|\bsāls\b/, 'nutrition.salt'],
  [/^tauki|\btauki\b/, 'nutrition.fat'],
];

export function nutrientKey(name: string): string | null {
  const normalized = name.trim().toLowerCase();
  const match = NUTRIENT_PATTERNS.find(([pattern]) => pattern.test(normalized));
  return match ? match[1] : null;
}
