import { Component, OnInit } from '@angular/core';
import { ToDoListService } from './service/todolist.service';
import { Task } from 'src/app/models/task';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  tasksResult: Task[];
  totalPages: number = 0;   // Total de páginas
  pageNumber: number = 1;   // Página actual
  pageSize: number = 5;     // Tamaño de la página (cuántos registros por página)
  totalRecords: number = 0;

  constructor(private toDoListService: ToDoListService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadTasks()
  }

  // private createFormGroup(){
  //   return this.fb.group({
  //     title : ["", [Validators.required]],
  //     description: ["", [Validators.required]],
  //     isCompleted: [false],
  //     isEliminated : [false],
  //   });
  // }

  async getTasks(){
    this.toDoListService.GetTask().then(resp => {
      this.tasksResult = resp
    })
  }

  loadTasks() {
    this.toDoListService.getTaskGrid(this.pageNumber, this.pageSize).subscribe(response => {
      this.tasksResult = response.Data;
      this.tasksResult = this.tasksResult.filter((el) => el.IsEliminated == false);
      this.totalRecords = response.TotalRecords;
      this.totalPages = response.TotalPages;
    }, error => {
      console.error('Error al cargar las tareas', error);
    });
  }
  // Método para navegar a la página anterior
  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadTasks();
    }
  }

  // Método para navegar a la página siguiente
  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadTasks();
    }
  }

  async updateTask(id:string, task: Task){
    this.toDoListService.updateTask(id, task).then(resp => {
      window.location.reload();
    })
  }
  async deleteTask(id:string){
    this.toDoListService.deleteTask(id).then(resp => {
      window.location.reload();
    })
  }
}
