import { Injectable } from '@angular/core';
import { Task } from '../../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  API_URL = "http://localhost:4000/api/todo-app"

  constructor(private http: HttpClient) { }

  getTasks(sortBy: string = 'createdAt', order: 'asc' | 'desc' = 'desc'): Observable<Task[]> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<Task[]>(`${this.API_URL}/get-tasks`, { params });
  }

  getTask(id:any): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/get-task/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.API_URL}/create-task`, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/update-task/${id}`, task);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.API_URL}/delete-task/${id}`);
  }
}
