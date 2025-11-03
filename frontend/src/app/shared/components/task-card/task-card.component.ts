import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArchive,
  faClock,
  faTags,
  faCalendarDays,
  faTrash,
  faPen,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../../core/models';
import { Status } from '../../../core/enums';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;

  // Outputs for actions
  @Output() archiveToggle = new EventEmitter<{ id: string; archived: boolean }>();
  @Output() changeStatus = new EventEmitter<{ id: string; status: Status }>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  Status = Status;
  statusValues = Object.values(Status);

  faArchive = faArchive;
  faTrash = faTrash;
  faClock = faClock;
  faTags = faTags;
  faCalendarDays = faCalendarDays;
  faPen = faPen;
  faEllipsisVertical = faEllipsisVertical;

  openMenu = false;

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  closeMenu() {
    this.openMenu = false;
  }

  get dueDateFormatted() {
    if (!this.task.dueDate) return null;
    const d = new Date(this.task.dueDate);
    return d.toLocaleDateString();
  }

  onArchive() {
    this.archiveToggle.emit({ id: this.task.id, archived: this.task.archived });
  }

  onStatusChange(value: string) {
    if (this.statusValues.includes(value as Status)) {
      this.changeStatus.emit({ id: this.task.id, status: value as Status });
    }
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onEdit() {
    this.edit.emit(this.task);
  }
}
