import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { removeTaskAction, completeTaskAction } from '@store/actions';
import { ITask, initAppState } from '@store/reducers';
import { initState } from '@store/reducers/to-do.reducers';

import { mockForTestNewTask, mockListForTest} from 'src/app/app.contants';
import { CoreModule } from 'src/app/core/core.module';

import { ToDoListComponent } from './to-do-list.component';





describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let mockStore: MockStore;
  let store: Store;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ReactiveFormsModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [ ToDoListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState: {
          ...initAppState,
          toDo: initState
        }}),
        {
          provide: MatDialogRef,
          useValue: {
            open: () => {},
          }
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    store = TestBed.inject(Store);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should completed task be last', done => {
    component.tasks$.pipe(first()).subscribe(tasks => {
      expect(tasks).toHaveSize(0);
    });

    const newToDoList = [...mockListForTest, mockForTestNewTask];

    mockStore.setState({
      ...initAppState,
      toDo: {
        ...initState,
        toDoList: newToDoList,
      }       
    });

    component.tasks$.subscribe(tasks => {
      expect(tasks).toHaveSize(mockListForTest.length + 1);
      expect(tasks[0].id).toBe(mockForTestNewTask.id);
      done();
    });
  });

  it('should open modal with mocked task', done => {
    spyOn(matDialog, 'open').and.stub().and.callFake((component, { data }) => {
      expect(data).toBe(mockForTestNewTask);
      done();
    });

    component.onEdit(mockForTestNewTask as ITask);
  });

  it('should trigger completeTaskAction action with mocked task', done => {
    spyOn(store, 'dispatch').and.stub().and.callFake((action) => {
      expect(action).toEqual(completeTaskAction({ payload: mockForTestNewTask as ITask}));
      done();
    });

    component.onComplete(mockForTestNewTask as ITask);
  });

  it('should trigger removeTaskAction action with mocked task', done => {
    spyOn(store, 'dispatch').and.stub().and.callFake((action) => {
      expect(action).toEqual(removeTaskAction({ payload: { id: mockForTestNewTask.id }}));
      done();
    });

    component.onRemove(mockForTestNewTask as ITask);
  });
});
