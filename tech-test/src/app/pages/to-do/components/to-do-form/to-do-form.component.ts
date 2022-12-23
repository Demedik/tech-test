import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ITask } from '@store/reducers';
import { createOrUpdateAction } from '@store/actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit {

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    label: new FormControl('',[ Validators.required]),
    description: new FormControl('', [ Validators.required ]),
    category: new FormControl('', [ Validators.required ]),
    done: new FormControl(false),
  });

  constructor(private store: Store, private dialogRef: MatDialogRef<ToDoFormComponent>, @Inject(MAT_DIALOG_DATA) private data?: ITask) {
    if(data) {
      this.taskForm.setValue(data);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(fg: FormGroup) {
    if(!fg.valid) return;
    this.store.dispatch(createOrUpdateAction({payload: fg.value}));
    this.onClose();
  }

  ngOnInit(): void {
  }

}
