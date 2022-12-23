import { createSelector } from '@ngrx/store';

import { IToDoState } from '../reducers/to-do.reducers';

export const selectToDoState = (state: {toDo: IToDoState}) =>  state.toDo;
export const selectAllTasks = createSelector(selectToDoState, (state: IToDoState) => state.toDoList);