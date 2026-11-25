import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats prices that arrive from different shops in different shapes
 * ("1.49€", "1.49", 1.49, "12,99 €") as "1.49 €".
 * Anything that isn't a number is shown as it came.
 */
@Pipe({
    name: 'price',
    standalone: false
})
export class PricePipe implements PipeTransform {
  transform(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    const amount =
      typeof value === 'number'
        ? value
        : parseFloat(String(value).replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(amount) ? `${amount.toFixed(2)} €` : String(value);
  }
}
