import { Injectable } from '@angular/core';
import { Task } from '../../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_URL = "https://todo-app-production-95bd.up.railway.app/api/todo-app"
  //API_URL = "http://localhost:4000/api/todo-app"

  private taskSubject: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null);  // BehaviorSubject para una tarea específica
  public task$: Observable<Task | null> = this.taskSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(sortBy: string, order: 'asc' | 'desc', filters: { state?: string[]; priority?: string[]; labels?: string[] }) {
    let params = new HttpParams().set('sortBy', sortBy).set('order', order);

    // Agregamos los filtros al HttpParams
    if (filters.state) {
      params = params.set('state', filters.state.join(','));
    }
    if (filters.priority) {
      params = params.set('priority', filters.priority.join(','));
    }
    if (filters.labels) {
      params = params.set('labels', filters.labels.join(','));
    }

    return this.http.get<Task[]>(`${this.API_URL}/get-tasks`, { params });
  }
  getTaskById(id: string): void {
    this.http.get<{ task: Task }>(`${this.API_URL}/get-task/${id}`).subscribe(response => {
      this.taskSubject.next(response.task);
    });
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
