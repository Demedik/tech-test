import { createReducer, on } from "@ngrx/store";

import { 
    createTaskSuccessAction, 
    getAllTasksSuccessAction, 
    removeTaskSuccessAction, 
    updateTaskSuccessAction 
} from './../actions/to-do.actions';

export interface ITask {
    id: number;
    label: string;
    description:  string;
    category: string;
    done: string | false;
};
  
export interface IToDoState {
    toDoList: ITask[];
    selectedTask: number | null;
};

export const initState: IToDoState = {
    toDoList: [],
    selectedTask: null,
};

export const getAllTasksSuccessReducer = (state: IToDoState,  { payload }) => ({...state, toDoList: payload});
export const createTaskSuccessReducer = (state: IToDoState,  { payload }) => ({...state, toDoList: [...state.toDoList, payload]});
export const updateTaskSuccessReducer = (state: IToDoState,  { payload }) => {
    const newToDoList = state.toDoList.map(item => {
        if(item.id === payload.id) return payload;
        return item;
    });

    return ({...state, toDoList: newToDoList});
};
export const removeTaskSuccessReducer = (state: IToDoState,  { payload }) => {
    const newToDoList = state.toDoList.reduce((acc, item) => {
        if(item.id === payload.id) return acc;
        acc.push(item)
        return acc;
    }, []);

    return ({...state, toDoList: newToDoList});
};

export const toDoReducers = createReducer(initState,
    on(getAllTasksSuccessAction, getAllTasksSuccessReducer),
    on(createTaskSuccessAction,createTaskSuccessReducer),
    on(updateTaskSuccessAction, updateTaskSuccessReducer),
    on(removeTaskSuccessAction, removeTaskSuccessReducer),
)