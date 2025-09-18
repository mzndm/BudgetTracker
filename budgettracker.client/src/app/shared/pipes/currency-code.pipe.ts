import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCode'
})
export class CurrencyCodePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 980:
        return 'UAH';
      case 978:
        return 'EUR';
      case 840:
        return 'USD';
      default:
        return 'UAH'; // Default to UAH if currency code is not recognized
    }
  }

}
