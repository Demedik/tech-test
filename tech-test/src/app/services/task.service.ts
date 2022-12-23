import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITask } from '@store/reducers/to-do.reducers';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends HttpService {

  constructor(private readonly httpClient: HttpClient) {
    super(httpClient);
  }

  getAllTasks() {
    return super.GET<ITask[]>('tasks');
  }

  getTask(id: number) {
    return super.GET<ITask>(`tasks/${id}`)
  }

  createTask(task: Omit<ITask, 'id'>) {
    return super.POST<Omit<ITask, 'id'>, ITask>('tasks', task);
  }

  updateTask(id: number, task: Partial<ITask>) {
    return super.PATCH<ITask>(`tasks/${id}`, task)
  }

  removeTask(id: number) {
    return super.DELETE<ITask>(`tasks/${id}`)
  }
}
