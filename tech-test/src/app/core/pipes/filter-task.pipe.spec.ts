import { ITask } from '@store/reducers';

import { FilterTaskPipe } from './filter-task.pipe';
import { mockListForTest } from 'src/app/app.contants';

describe('FilterTaskPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTaskPipe();
    expect(pipe).toBeTruthy();
  });

  it('Filter task pipe should filter task by string', () => {
    const searchStr = 'First';
    const pipe = new FilterTaskPipe();
    const filteredValues = pipe.transform(mockListForTest as ITask[], searchStr);

    expect(filteredValues).toHaveSize(1);
    expect(filteredValues[0]?.label.includes(searchStr)).toBeTrue();
    expect(filteredValues[0]?.category.includes(searchStr)).toBeTrue();
  });

  it('Filter task pipe should return tasks', () => {
    const searchStr = '';
    const pipe = new FilterTaskPipe();
    const filteredValues = pipe.transform(mockListForTest as ITask[], searchStr);

    expect(filteredValues).toHaveSize(mockListForTest.length);
  });
});
