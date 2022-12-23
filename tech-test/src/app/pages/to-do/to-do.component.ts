import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  searchStr: string;

  constructor(private dialog: MatDialog) { }

  createTask(): void {
    this.dialog.open(ToDoFormComponent)
  }

  ngOnInit(): void {
  }

}
