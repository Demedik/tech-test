import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import stc from 'string-to-color';
import { MatDialog } from '@angular/material/dialog';

import { completeTaskAction, getAllTasksAction, removeTaskAction } from '@store/actions';
import { selectAllTasks } from '@store/selectors';
import { ITask } from '@store/reducers/to-do.reducers';

import { ToDoFormComponent } from '../to-do-form/to-do-form.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  @Input() searchStr: string = '';

  tasks$ = this.store.select(selectAllTasks).pipe(
    map(tasks => {
      const incomplete = tasks.filter(item => !Boolean(item.done)).sort((a,b) => a.id - b.id);
      const complete = tasks.filter(item => Boolean(item.done)).sort((a,b) => a.id - b.id);

      return [...incomplete, ...complete];
    })
  );

  constructor(private store: Store, private dialog: MatDialog) { }

  preventOpening(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onEdit(task: ITask) {
    this.dialog.open(ToDoFormComponent, {
      data: task,
    })
  }

  onComplete(task: ITask) {
    this.store.dispatch(completeTaskAction({payload: task}));
  }

  onRemove({id}: ITask) {
    this.store.dispatch(removeTaskAction({ payload: {id} }))
  }

  defineColorOfCategory(str: string) {
    return stc(str);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllTasksAction());
  }
}
