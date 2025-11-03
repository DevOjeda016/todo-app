/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Importance, Status } from '../../../core/enums';
import { CreateTask, Task } from '../../../core/models';
import { TaskService } from '../../../core/services';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task-dialog.component.html',
})
export class CreateTaskDialogComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  @ViewChild('taskModal', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;
  @Output() created = new EventEmitter<Task>();

  // Expose enums values for template
  Status = Status;
  Importance = Importance;
  statusValues = Object.values(Status);
  importanceValues = Object.values(Importance);

  taskForm = this.fb.group({
    title: ['', [Validators.maxLength(200), Validators.required]],
    description: [''],
    dueDate: [null as string | null],
    estimatedMinutes: [null as number | null, [Validators.min(1)]],
    tags: [''],
    importance: [null as Importance | null],
    status: [null as Status | null],
  });

  open() {
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

    const payload: CreateTask = {
      title: raw.title!,
      ...(raw.description ? { description: raw.description } : {}),
      ...(raw.dueDate ? { dueDate: raw.dueDate } : {}),
      ...(raw.estimatedMinutes ? { estimatedMinutes: raw.estimatedMinutes } : {}),
      ...(tagsArray.length > 0 ? { tags: tagsArray } : {}),
      ...(raw.importance ? { importance: raw.importance } : {}),
      ...(raw.status ? { status: raw.status } : {}),
    };

    try {
      const task = await this.taskService.createTask(payload);
      this.created.emit(task);
      this.taskForm.reset();
      this.close();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
}
