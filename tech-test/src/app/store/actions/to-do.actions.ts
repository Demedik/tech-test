import { createAction, props } from "@ngrx/store";

import { ITask } from "../reducers/to-do.reducers";

export enum ToDoActions {
    GET_ALL_TASKS = 'GET_ALL_TASKS',
    GET_ALL_TASKS_SUCCESS = 'GET_ALL_TASKS_SUCCESS',
    GET_ALL_TASKS_ERROR = 'GET_ALL_TASKS_ERROR',
    CREATE_OR_UPDATE = 'CREATE_OR_UPDATE',
    CREATE_TASK = 'CREATE_TASK',
    CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS',
    CREATE_TASK_ERROR = 'CREATE_TASK_ERROR',
    UPDATE_TASK = 'UPDATE_TASK',
    UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS',
    UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR',
    COMPLETE_TASK = 'COMPLETE_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS',
    REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR',
}

export const getAllTasksAction = createAction(ToDoActions.GET_ALL_TASKS);
export const getAllTasksSuccessAction = createAction(ToDoActions.GET_ALL_TASKS_SUCCESS, props<{payload: ITask[]}>());
export const getAllTasksErrorAction = createAction(ToDoActions.GET_ALL_TASKS_ERROR);
export const createOrUpdateAction = createAction(ToDoActions.CREATE_OR_UPDATE, props<{payload: ITask}>())
export const createTaskAction = createAction(ToDoActions.CREATE_TASK, props<{payload: Omit<ITask, 'id'>}>());
export const createTaskSuccessAction = createAction(ToDoActions.CREATE_TASK_SUCCESS, props<{payload: ITask}>());
export const createTaskErrorAction = createAction(ToDoActions.CREATE_TASK_ERROR);
export const updateTaskAction = createAction(ToDoActions.UPDATE_TASK, props<{payload: ITask}>());
export const updateTaskSuccessAction = createAction(ToDoActions.UPDATE_TASK_SUCCESS, props<{payload: ITask}>());
export const updateTaskErrorAction = createAction(ToDoActions.UPDATE_TASK_ERROR);
export const completeTaskAction = createAction(ToDoActions.COMPLETE_TASK, props<{payload: ITask}>());
export const removeTaskAction = createAction(ToDoActions.REMOVE_TASK, props<{payload: {id: number}}>());
export const removeTaskSuccessAction = createAction(ToDoActions.REMOVE_TASK_SUCCESS, props<{payload: {id: number}}>());
export const removeTaskErrorAction = createAction(ToDoActions.REMOVE_TASK_ERROR);