/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Importance, Status } from '../../../core/enums';
import { CreateTask, Task } from '../../../core/models';
import { TaskService, ToastService } from '../../../core/services';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task-dialog.component.html',
})
export class CreateTaskDialogComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private toast = inject(ToastService);

  @ViewChild('taskModal', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;
  @Output() created = new EventEmitter<Task>();
  @Output() updated = new EventEmitter<Task>();

  // Expose enums values for template
  Status = Status;
  Importance = Importance;
  statusValues = Object.values(Status);
  importanceValues = Object.values(Importance);

  mode: 'create' | 'edit' = 'create';
  private editingTaskId?: string;

  taskForm = this.fb.group({
    title: ['', [Validators.maxLength(200), Validators.required]],
    description: [''],
    dueDate: [null as string | null, [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    estimatedMinutes: [null as number | null, [Validators.min(1)]],
    tags: [''],
    importance: [null as Importance | null],
    status: [null as Status | null],
  });

  open() {
    // Backward compatible: open in create mode
    this.openForCreate();
  }

  openForCreate() {
    this.mode = 'create';
    this.editingTaskId = undefined;
    this.taskForm.reset();
    this.dialogRef.nativeElement.showModal();
  }

  openForEdit(task: Task) {
    this.mode = 'edit';
    this.editingTaskId = task.id;
    this.taskForm.reset({
      title: task.title,
      description: task.description ?? '',
      dueDate: task.dueDate ?? null,
      estimatedMinutes: task.estimatedMinutes ?? null,
      tags: (task.tags ?? []).join(', '),
      importance: task.importance ?? null,
      status: task.status ?? null,
    });
    this.dialogRef.nativeElement.showModal();
  }

  close() {
    this.dialogRef.nativeElement.close();
  }

  async submitTask() {
    if (this.taskForm.invalid) return;

    const raw = this.taskForm.value;

    const tagsArray = raw.tags
      ? raw.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      : [];

    const base: CreateTask = {
      title: raw.title!,
      ...(raw.description ? { description: raw.description } : {}),
      ...(raw.dueDate ? { dueDate: raw.dueDate } : {}),
      ...(raw.estimatedMinutes ? { estimatedMinutes: raw.estimatedMinutes } : {}),
      ...(tagsArray.length > 0 ? { tags: tagsArray } : {}),
      ...(raw.importance ? { importance: raw.importance } : {}),
      ...(raw.status ? { status: raw.status } : {}),
    };

    try {
      if (this.mode === 'create') {
        const task = await this.taskService.createTask(base);
        this.created.emit(task);
        this.toast.show('Tarea creada', 'success');
      } else if (this.mode === 'edit' && this.editingTaskId) {
        const task = await this.taskService.updateTask(this.editingTaskId, base);
        this.updated.emit(task);
        this.toast.show('Tarea actualizada', 'success');
      }
      this.taskForm.reset();
      this.close();
    } catch (error) {
      console.error('Error saving task:', error);
      this.toast.show('Error al guardar la tarea', 'error');
    }
  }
}
