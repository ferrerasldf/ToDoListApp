import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';

const routes: Routes = [{path:"tasks-list", component:ToDoListComponent},
                        { path: '', redirectTo: '/tasks-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
