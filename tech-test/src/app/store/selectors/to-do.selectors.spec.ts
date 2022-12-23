import { selectAllTasks, selectToDoState } from './to-do.seletors';
import { initAppState } from './../reducers';
import { initState } from "../reducers/to-do.reducers";

import { mockListForTest } from 'src/app/app.contants';

describe('To Do Selectors', () => {
    let taskListForTest;
    let onGoingState;
    let appState;

    beforeEach(() => {
        taskListForTest = [...mockListForTest];
        onGoingState = {...initState, toDoList: taskListForTest}
        appState = {...initAppState, toDo: onGoingState};
    });

    it('selectToDoState should return to do state', () => {
        const result = selectToDoState(appState);
        expect(result).toBe(onGoingState);
    });

    it('selectAllTasks should return task list state', () => {
        const result = selectAllTasks(appState);
        expect(result).toBe(taskListForTest);
    });
  });