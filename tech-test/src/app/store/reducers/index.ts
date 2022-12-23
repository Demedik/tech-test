import { ITask } from './to-do.reducers';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { toDoReducers, IToDoState } from './to-do.reducers';
import { environment } from '../../../environments/environment';

export interface IToDoListItem {
  id: number;
  label: string;
  description:  string;
  category: string;
  done: string | false;
};

export interface State {
  toDo: IToDoState | null;
};

export const initAppState: State = {
  toDo: null
};

export const reducers: ActionReducerMap<State> = {
  toDo: toDoReducers
};

export { ITask };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
