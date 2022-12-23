import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { format } from 'date-fns';

import { ITask } from './../reducers/to-do.reducers';
import { State } from './../reducers';
import { ToDoEffects } from './to-do.effects';
import { 
    getAllTasksSuccessAction, 
    createTaskAction, 
    createTaskSuccessAction, 
    updateTaskAction, 
    updateTaskSuccessAction, 
    createOrUpdateAction, 
    completeTaskAction, 
    removeTaskSuccessAction, 
    removeTaskAction,
    getAllTasksAction 
} from './../actions/to-do.actions';
import { initAppState } from './../reducers';
import { initState } from './../reducers/to-do.reducers';

import { TaskService } from 'src/app/services/task.service';

import { mockForTestNewTask, mockListForTest } from 'src/app/app.contants';

describe('ToDoEffects', () => {
    let actions$: Observable<any>;
    let effects: ToDoEffects;
    let store: MockStore<State>;
    let httpService: TaskService;

    let taskListForTest;
    let onGoingState;
    let initialState;

    beforeEach(() => {
        taskListForTest = [...mockListForTest];
        onGoingState = {...initState, toDoList: [...taskListForTest]}
        initialState = {...initAppState, toDo: onGoingState};
        
        TestBed.configureTestingModule({
            providers: [
                ToDoEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: TaskService, useValue: {
                    getAllTasks: () => {},
                    getTask: () => {},
                    createTask: () => {},
                    updateTask: () => {},
                    removeTask: () => {},
                } },
            ],
        });
        effects = TestBed.inject(ToDoEffects);
        store = TestBed.inject(MockStore);
        httpService = TestBed.inject(TaskService);
    });

    it('ToDoEffects.loadAllTasks$ should trigger getAllTasks request to api and return mock task list and trigger getAllTasksSuccessAction', (done) => {
        const spy = spyOn(httpService, 'getAllTasks').and.returnValue(of(mockListForTest as ITask[]));
        actions$ = of(getAllTasksAction());
        effects.loadAllTasks$.subscribe((res) => {
            expect(res).toEqual(getAllTasksSuccessAction({ payload: mockListForTest as ITask[] }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('ToDoEffects.createTask$ should trigger createTask request to api and return mock task and trigger createTaskSuccessAction', (done) => {
        const { id, ...body } = mockForTestNewTask;
        const response = {id, ...body};
        const spy = spyOn(httpService, 'createTask').and.returnValue(of(response as ITask));
        actions$ = of(createTaskAction({ payload: body as ITask }));
        effects.createTask$.subscribe((res) => {
            expect(res).toEqual(createTaskSuccessAction({ payload: response as ITask }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('ToDoEffects.updateTask$ should trigger updateTask request to api and return mock task and trigger updateTaskSuccessAction', (done) => {
        const { ...body } = mockForTestNewTask;

        const spy = spyOn(httpService, 'updateTask').and.returnValue(of(body as ITask));
        actions$ = of(updateTaskAction({ payload: body as ITask}));
        effects.updateTask$.subscribe((res) => {
            expect(res).toEqual(updateTaskSuccessAction({ payload: body as ITask }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('ToDoEffects.createOrUpdate$ should trigger createTaskAction due to missing id', (done) => {
        const { id, ...body } = mockForTestNewTask;
        const response = {id, ...body};
        
        spyOn(httpService, 'createTask').and.returnValue(of(response as ITask));
        actions$ = of(createOrUpdateAction({payload: body as ITask}));
        effects.createOrUpdate$.subscribe((res) => {
            expect(res).toEqual(createTaskAction({ payload: body as ITask }));
            done();
        });
    });

    it('ToDoEffects.createOrUpdate$ should trigger updateTaskAction due to there is id', (done) => {
        const { ...body } = mockForTestNewTask;
        
        spyOn(httpService, 'updateTask').and.returnValue(of(body as ITask));
        actions$ = of(createOrUpdateAction({payload: body as ITask}));
        effects.createOrUpdate$.subscribe((res) => {
            expect(res).toEqual(updateTaskAction({ payload: body as ITask }));
            done();
        });
    });

    it('ToDoEffects.completeTask$ should change done to current date in format dd-mm-yyyy trigger updateTask request to api and return mock task and trigger updateTaskSuccessAction', (done) => {
        const { ...body } = mockForTestNewTask;
        const response = {...body, done: format(new Date(), 'dd-MM-yyyy')};

        const spy = spyOn(httpService, 'updateTask').and.returnValue(of(response as ITask));
        actions$ = of(completeTaskAction({ payload: body as ITask}));
        effects.completeTask$.subscribe((res) => {
            expect(res).toEqual(updateTaskSuccessAction({ payload: response as ITask }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('ToDoEffects.loadAllTasks$ should trigger request to api and return mock task list and trigger getAllTasksSuccessAction', (done) => {
        const spy = spyOn(httpService, 'removeTask').and.returnValue(of({} as ITask));
        actions$ = of(removeTaskAction({ payload: { id: mockForTestNewTask.id } }));
        effects.removeTask$.subscribe((res) => {
            expect(res).toEqual(removeTaskSuccessAction({ payload: {id: mockForTestNewTask.id} as ITask }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});