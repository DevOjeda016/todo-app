import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArchive,
  faCalendarDays,
  faClock,
  faEllipsisVertical,
  faPen,
  faTags,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Importance, Status } from '../../../core/enums';
import { Task } from '../../../core/models';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  constructor(private readonly host: ElementRef<HTMLElement>) {}

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.openMenu) return;
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.openMenu = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  get dueDateFormatted() {
    if (!this.task.dueDate) return null;
    const str = this.task.dueDate;
    let d: Date;
    if (str.includes('T')) d = new Date(str);
    else {
      const [y, m, day] = str.split('-').map((n) => Number(n));
      d = new Date(y, (m || 1) - 1, day || 1);
    }
    return d.toLocaleDateString();
  }

  statusSelectClass() {
    switch (this.task.status) {
      case Status.TODO:
        return 'bg-sky-100 text-sky-700 dark:bg-sky-800 dark:text-sky-100';
      case Status.IN_PROGRESS:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-100';
      case Status.COMPLETED:
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100';
      default:
        return '';
    }
  }

  importanceClass() {
    switch (this.task.importance) {
      case Importance.NOTHING:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100';
      case Importance.LOW:
        return 'bg-sky-100 text-sky-700 dark:bg-sky-800 dark:text-sky-100';
      case Importance.MEDIUM:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-100';
      case Importance.HIGH:
        return 'bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-100';
      default:
        return '';
    }
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
