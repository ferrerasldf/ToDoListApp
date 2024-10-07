import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Task } from 'src/app/models/task';

@Injectable({
    providedIn: 'root'
  })

  export class ToDoListService {
      private apiUrl = environment.toDoListApi + "/Tasks"

      constructor(private httpClient: HttpClient) { }

    async GetTask(): Promise<Task[]>{
        return this.httpClient
        .get<Task[]>(this.apiUrl)
        .pipe(
            map((resp)=>{
                return resp;
            })
        )
        .toPromise();
    }

    getTaskGrid(pageNumber: number, pageSize: number): Observable<any>{
      let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      return this.httpClient.get<any>(this.apiUrl+ "/Grid", { params });
    }

    async saveTask(task : Task) : Promise<any>{
        return this.httpClient.post(this.apiUrl,task).toPromise();
    }

    async updateTask(id : string,task: Task) : Promise<any>{
      const url = `${this.apiUrl}/${id}`;
        return this.httpClient.put(url,task).toPromise();
    }

    async deleteTask(id : string) : Promise<any> {
      const url = `${this.apiUrl}/${id}`;
        return this.httpClient.delete(url).toPromise();
    }
  }
