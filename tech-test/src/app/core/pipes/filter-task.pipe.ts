import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '@store/reducers';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(value: ITask[], searchStr: string): ITask[] {
    return value.filter(({label, category}) => !searchStr ||
                                               label.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()) ||
                                               category.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()));
  }

}
