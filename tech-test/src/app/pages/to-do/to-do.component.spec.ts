import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ToDoComponent } from './to-do.component';
import { By } from '@angular/platform-browser';

describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' }; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
      ],
      declarations: [ ToDoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ToDoComponent should create', () => {
    expect(component).toBeTruthy();
  });

  it('ToDoComponent should open modal', () => {
    const dialogSpy: jasmine.Spy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    component.createTask();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('ToDoComponent should find search input and change the value', async () => {
    const searchValue = 'First';
    fixture.detectChanges();
    await fixture.whenStable();

    const inputDE = fixture.debugElement.query(By.css('input'));
    const inputEl = inputDE.nativeElement;

    inputEl.value = searchValue;
    inputEl.dispatchEvent(new Event('input'));

    expect(component.searchStr).toBe(searchValue);
  });
});
