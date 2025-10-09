import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {
  transform(value: number | null | undefined): number {
    if (value == null) {
      return 0;
    }
    return Math.abs(value);
  }
}


