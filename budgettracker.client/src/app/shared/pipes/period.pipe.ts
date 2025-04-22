import { Pipe, PipeTransform } from '@angular/core';
import {format} from "date-fns";

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(value: Date, periodId: number): unknown {
    let result = format(value, 'MMMM yyyy');

    switch (periodId) {
      case 1: result = 'Week: ' + format(value, 'w yyyy'); break;
      case 2: result = format(value, 'MMMM yyyy'); break;
      case 3: result = 'Quarter: ' + format(value, 'q yyyy'); break;
      case 4: result = format(value, 'yyyy'); break;
      default: return result;
    }
    return result;
  }

}
