import { 
    createTaskSuccessReducer, 
    getAllTasksSuccessReducer, 
    initState, 
    removeTaskSuccessReducer, 
    updateTaskSuccessReducer 
} from "./to-do.reducers";

import { mockListForTest, mockTaskForTest, mockIdForTest, mockForTestNewTask } from 'src/app/app.contants';

describe('To Do Reducers', () => {
    let taskListForTest;
    let onGoingState;

    beforeEach(() => {
        taskListForTest = [...mockListForTest];
        onGoingState = {...initState, toDoList: taskListForTest}
    });

    it('getAllTasksSuccessReducer should update and return state with payload', () => {
        const result = getAllTasksSuccessReducer(initState, { payload: taskListForTest});
        expect(result.toDoList).toHaveSize(taskListForTest.length);
    });

    it('getAllTasksSuccessReducer should update and return state with payload', () => {
        const payload = {...mockForTestNewTask};

        const result = createTaskSuccessReducer(onGoingState, { payload });

        expect(result.toDoList).toHaveSize(taskListForTest.length + 1);
        expect(result.toDoList.find(({ id }) => id === payload.id)).toBeTruthy();
    });

    it('updateTaskSuccessReducer should update the chosen task and return updated state', () => {
        const testLabel = 'Some test label';
        const payload = {
            ...mockTaskForTest,
            label: testLabel,
        };

        const result = updateTaskSuccessReducer(onGoingState, { payload });

        expect(result.toDoList).toHaveSize(taskListForTest.length);
        expect(result.toDoList.find(({ id }) => id === payload.id)?.label).toBe(testLabel);
    });

    it('removeTaskSuccessReducer should remove the chosen task and return updated state', () => {
        const testLabel = 'Some test label';
        const payload = {
            id: mockIdForTest,
        };

        const result = removeTaskSuccessReducer(onGoingState, { payload });

        expect(result.toDoList).toHaveSize(taskListForTest.length - 1);
        expect(result.toDoList.find(({ id }) => id === payload.id)).toBeFalsy();
    });
  });