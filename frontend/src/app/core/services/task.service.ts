import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { CreateTask, Task } from '../models';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}`;

  async createTask(task: CreateTask): Promise<Task> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<Task>;
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(this.apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<Task[]>;
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<Task>;
  }

  async updateTask(id: string, task: Partial<CreateTask>): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<Task>;
  }

  async archiveTask(id: string): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/${id}/archive`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<Task>;
  }

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}
