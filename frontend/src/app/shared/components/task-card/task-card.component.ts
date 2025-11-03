import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArchive, faClock, faTags, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
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
  @Output() archive = new EventEmitter<string>();
  @Output() changeStatus = new EventEmitter<{ id: string; status: Status }>();

  Status = Status;
  statusValues = Object.values(Status);

  faArchive = faArchive;
  faClock = faClock;
  faTags = faTags;
  faCalendarDays = faCalendarDays;

  get dueDateFormatted() {
    if (!this.task.dueDate) return null;
    const d = new Date(this.task.dueDate);
    return d.toLocaleDateString();
  }

  onArchive() {
    this.archive.emit(this.task.id);
  }

  onStatusChange(value: string) {
    if (this.statusValues.includes(value as Status)) {
      this.changeStatus.emit({ id: this.task.id, status: value as Status });
    }
  }
}
