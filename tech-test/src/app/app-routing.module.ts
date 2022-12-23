import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'to-do',
    pathMatch: 'full'
  },
  {
    path: 'to-do',
    loadChildren: () => import('./pages/to-do/to-do.module').then(({ToDoModule}) => ToDoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
