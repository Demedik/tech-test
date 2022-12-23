import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { createOrUpdateAction } from '@store/actions';
import { ITask } from '@store/reducers';

import { mockTaskForTest } from 'src/app/app.contants';

import { ToDoFormComponent } from './to-do-form.component';




describe('ToDoFormComponent create modal', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule,
        ReactiveFormsModule,
      ],
      declarations: [ ToDoFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Store, useValue: {
          dispatch: () => {}
        }},
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: null
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoFormComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ToDoFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('ToDoFormComponent should submit form for create task and trigger createOrUpdateAction', async () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();
    const simpleValue = 'Test';
    
    await fixture.whenStable();

    const inputLabelDb = fixture.debugElement.query(By.css('[formControlName=label]'));
    const inputLabelEl = inputLabelDb.nativeElement;
    inputLabelEl.value = simpleValue;
    inputLabelEl.dispatchEvent(new Event('input'));

    const inputCategoryDb = fixture.debugElement.query(By.css('[formControlName=category]'));
    const inputCategoryEl = inputCategoryDb.nativeElement;
    inputCategoryEl.value = simpleValue;
    inputCategoryEl.dispatchEvent(new Event('input'));

    const inputDescriptionDb = fixture.debugElement.query(By.css('[formControlName=description]'));
    const inputDescriptionEl = inputDescriptionDb.nativeElement;
    inputDescriptionEl.value = simpleValue;
    inputDescriptionEl.dispatchEvent(new Event('input'));

    const formValues = component.taskForm.value;

    component.onSubmit(component.taskForm);
    

    expect(formValues.id).toBeNull();
    expect(formValues.done).toBeFalse();
    expect(formValues.label).toBe(simpleValue);
    expect(formValues.category).toBe(simpleValue);
    expect(formValues.description).toBe(simpleValue);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createOrUpdateAction({ payload: component.taskForm.value}))
  });
});

describe('ToDoFormComponent update modal', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule,
        ReactiveFormsModule,
      ],
      declarations: [ ToDoFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Store, useValue: {
          dispatch: () => {}
        }},
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {...mockTaskForTest}
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoFormComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ToDoFormComponent should submit form for update task and trigger createOrUpdateAction', async () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();

    await fixture.whenStable();
  
    component.onSubmit(component.taskForm);
    
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createOrUpdateAction({ payload: mockTaskForTest as ITask}))
  });
});
