/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArchive,
  faDesktop,
  faMoon,
  faPlus,
  faSearch,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { Importance } from '../../../enums/importance.enums';
import { Status } from '../../../enums/status.enums';
import { CreateTask } from '../../interfaces/create-task';
import { Task } from '../../interfaces/task';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './main.html',
})
export class Main {
  private themeService = inject(ThemeService);
  private fb = inject(FormBuilder);

  currentTheme = this.themeService.currentTheme;
  openThemeMenu = false;

  // Íconos
  faPlus = faPlus;
  faSearch = faSearch;
  faArchive = faArchive;
  faMoon = faMoon;
  faSun = faSun;
  faDesktop = faDesktop;

  taskForm = this.fb.group({
    title: ['', [Validators.maxLength(200), Validators.required]],
    description: [''],
    dueDate: [null as string | null],
    estimatedMinutes: [null as number | null, [Validators.min(1)]],
    tags: [''],
    importance: [null as Importance | null],
    status: [null as Status | null],
  });

  // Para usar en el template
  Status = Status;
  Importance = Importance;
  statusValues = Object.values(Status);
  importanceValues = Object.values(Importance);

  selectTheme(mode: 'light' | 'dark' | 'auto') {
    this.themeService.setTheme(mode);
    this.openThemeMenu = false;
  }

  async submitTask(dialog: HTMLDialogElement) {
    if (this.taskForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const raw = this.taskForm.value;

    // Convertir tags a array
    const tagsArray = raw.tags
      ? raw.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      : [];

    // Construir payload limpio
    const payload: Partial<CreateTask> = {
      title: raw.title!,
    };

    if (raw.description) payload.description = raw.description;
    if (raw.dueDate) payload.dueDate = raw.dueDate;
    if (raw.estimatedMinutes) payload.estimatedMinutes = raw.estimatedMinutes;
    if (tagsArray.length > 0) payload.tags = tagsArray;
    if (raw.importance) payload.importance = raw.importance;
    if (raw.status) payload.status = raw.status;

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as Task;
      console.log('Task created:', data);

      dialog.close();
      this.taskForm.reset();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
}
