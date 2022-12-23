import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

import { CoreModule } from '../../core/core.module';

import { ToDoComponent } from './to-do.component';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';

@NgModule({
  declarations: [
    ToDoComponent,
    ToDoFormComponent,
    ToDoListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ToDoComponent
      }
    ]),
    CoreModule
  ]
})
export class ToDoModule { }
