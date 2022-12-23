import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators'; 
import { format } from 'date-fns';

import { ITask } from '../reducers/to-do.reducers';
import { 
    getAllTasksAction, 
    getAllTasksErrorAction, 
    getAllTasksSuccessAction, 
    createTaskAction, 
    createTaskErrorAction, 
    createTaskSuccessAction, 
    createOrUpdateAction, 
    updateTaskAction, 
    updateTaskErrorAction, 
    updateTaskSuccessAction, 
    completeTaskAction, 
    removeTaskAction, 
    removeTaskSuccessAction, 
    removeTaskErrorAction 
} from './../actions/to-do.actions';

import { TaskService } from './../../services/task.service';

@Injectable()
export class ToDoEffects {
    constructor(
        private actions$: Actions,
        private taskService: TaskService,
        private store: Store,
      ) {
    
      }

    loadAllTasks$ = createEffect(() => this.actions$.pipe(
        ofType(getAllTasksAction),
        switchMap(() => this.taskService.getAllTasks()
            .pipe(
                catchError(() => of(getAllTasksErrorAction())),
                map((item: ITask[]) => getAllTasksSuccessAction({ payload: item }))        
            )  
        )
    ));

    createTask$ = createEffect(() => this.actions$.pipe(
        ofType(createTaskAction),
        switchMap(({ payload }) => this.taskService.createTask({...payload, done: false})
            .pipe(
                catchError(() => of(createTaskErrorAction())),
                map((item: ITask) => createTaskSuccessAction({ payload: item }))        
            )  
        )
    ));

    createOrUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(createOrUpdateAction),
        map(({payload}) => {
            if(payload.id) {
                return updateTaskAction({payload})
            } else {
                return createTaskAction({payload});
            }
        })
    ));

    updateTask$ = createEffect(() => this.actions$.pipe(
        ofType(updateTaskAction),
        switchMap(({ payload }) => this.taskService.updateTask(payload.id, payload).pipe(
            catchError(() => of(updateTaskErrorAction())),
            map((item: ITask) => updateTaskSuccessAction({ payload: item }))
        ))
    ));

    completeTask$ = createEffect(() => this.actions$.pipe(
        ofType(completeTaskAction),
        switchMap(({ payload }) => this.taskService.updateTask(payload.id, {...payload, done: format(new Date(), 'dd-MM-yyyy') }).pipe(
            catchError(() => of(updateTaskErrorAction())),
            map((item: ITask) => updateTaskSuccessAction({ payload: item }))
        ))
    ));

    removeTask$ = createEffect(() => this.actions$.pipe(
        ofType(removeTaskAction),
        switchMap(({ payload }) => this.taskService.removeTask(payload.id).pipe(
            catchError(() => of(removeTaskErrorAction())),
            map((item: ITask) => removeTaskSuccessAction({ payload }))
        ))
    ));
}