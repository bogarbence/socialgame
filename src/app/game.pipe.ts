import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'game'
})
export class GamePipe implements PipeTransform {

  transform(values: any[], filter: any): any {
    if(filter === ''){
      return values;
    } else {
    return values.filter((item) => item.game === filter);
    }
  }

}
