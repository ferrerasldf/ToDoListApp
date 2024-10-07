import { Component, OnInit } from '@angular/core';
import { ToDoListService } from './service/todolist.service';
import { Task } from 'src/app/models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/service/sweet-alert.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  tasksResult: Task[];
  taskForm: FormGroup;
  totalPages: number = 0;   // Total de páginas
  pageNumber: number = 1;   // Página actual
  pageSize: number = 5;     // Tamaño de la página (cuántos registros por página)
  totalRecords: number = 0;

  constructor(private toDoListService: ToDoListService,
              private fb: FormBuilder,
              private swal: SweetAlertService
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      isCompleted: [false],
      isEliminated: [false],
    });
    this.loadTasks()
  }

   // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log('Formulario enviado con éxito:', this.taskForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
  async getTasks(){
    this.toDoListService.GetTask().then(resp => {
      this.tasksResult = resp
    })
  }

  loadTasks() {
    this.swal.ShowLoading();
    this.toDoListService.getTaskGrid(this.pageNumber, this.pageSize).subscribe(response => {
      this.tasksResult = response.Data;
      this.tasksResult = this.tasksResult.filter((el) => el.IsEliminated == false);
      this.totalRecords = response.TotalRecords;
      this.totalPages = response.TotalPages;
      this.swal.CloseLoading();
    }, error => {
      this.swal.CloseLoading();;
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
    this.swal.ShowQuestion("Actualización de Tarea","¿Está seguro de que desea completar esta tarea?").then(resp => {
      this.swal.ShowLoading();
      this.toDoListService.updateTask(id, task).then(resp => {
        this.swal.CloseLoading();
        window.location.reload();
      }).catch(resp => {
        this.swal.CloseLoading();
        this.swal.ShowError("Error", resp)
      })
    })
  }

  async deleteTask(id:string){
    this.swal.ShowQuestion("Eliminación de Tarea","¿Está seguro de que desea eliminar esta tarea?").then(resp => {
      this.swal.ShowLoading();
      this.toDoListService.deleteTask(id).then(resp => {
        this.swal.CloseLoading();
        window.location.reload();
      })
    }).catch(resp => {
      this.swal.CloseLoading();
      this.swal.ShowError("Error", resp)
    })
  }
}
