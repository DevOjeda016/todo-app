import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArchive, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemeSelectorComponent } from '../../shared/components/theme-selector/theme-selector.component';
import { CreateTaskDialogComponent } from '../../shared/components/create-task-dialog/create-task-dialog.component';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { Task } from '../../core/models';
import { TaskService, ToastService } from '../../core/services';
import { Status } from '../../core/enums';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    ThemeSelectorComponent,
    CreateTaskDialogComponent,
    TaskCardComponent,
  ],
  templateUrl: './main.html',
})
export class Main {
  constructor(
    private readonly taskService: TaskService,
    private readonly toast: ToastService,
  ) {
    void this.loadTasks();
  }

  // State as signals (zoneless change detection)
  tasks = signal<Task[]>([]);

  // Filters
  searchTerm = signal('');
  showArchived = signal(true);
  statusFilter = signal<'all' | Status>('all');
  statusOptions: Array<'all' | Status> = ['all', ...Object.values(Status)];

  // Íconos
  faPlus = faPlus;
  faSearch = faSearch;
  faArchive = faArchive;

  async loadTasks() {
    try {
      const list = await this.taskService.getTasks({
        archived: this.showArchived() ? 'all' : 'false',
      });
      this.tasks.set(list);
    } catch (err) {
      console.error('Error cargando tareas:', err);
      this.toast.show('Error cargando tareas', 'error');
      this.tasks.set([]);
    }
  }

  onTaskCreated(task: Task) {
    this.tasks.update((prev) => [task, ...prev]);
  }

  onTaskUpdated(task: Task) {
    this.tasks.update((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }

  filteredTasks = computed((): Task[] => {
    const tasks = this.tasks();
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const showArchived = this.showArchived();

    return tasks.filter((t) => {
      const matchesSearch = term
        ? (t.title + ' ' + (t.description || '') + ' ' + (t.tags?.join(' ') || ''))
            .toLowerCase()
            .includes(term)
        : true;

      const matchesStatus = status === 'all' ? true : t.status === status;
      const matchesArchived = showArchived ? true : !t.archived;
      return matchesSearch && matchesStatus && matchesArchived;
    });
  });

  async toggleShowArchived() {
    this.showArchived.update((v) => !v);
    await this.loadTasks();
    this.toast.show(
      this.showArchived() ? 'Mostrando todas (incluye archivadas)' : 'Ocultando archivadas',
      'info',
    );
  }

  onStatusFilterChange(val: string) {
    if (val === 'all' || (Object.values(Status) as string[]).includes(val)) {
      this.statusFilter.set(val as 'all' | Status);
    }
  }

  async onArchive(evt: { id: string; archived: boolean }) {
    const updated = evt.archived
      ? await this.taskService.updateTask(evt.id, { archived: false })
      : await this.taskService.archiveTask(evt.id);
    this.tasks.update((prev) => prev.map((t) => (t.id === evt.id ? updated : t)));
    this.toast.show(evt.archived ? 'Tarea desarchivada' : 'Tarea archivada', 'success');
  }

  async onChangeStatus(evt: { id: string; status: Status }) {
    const updated = await this.taskService.updateTask(evt.id, { status: evt.status });
    this.tasks.update((prev) => prev.map((t) => (t.id === evt.id ? updated : t)));
    this.toast.show('Estado actualizado', 'success');
  }

  async onDelete(id: string) {
    await this.taskService.deleteTask(id);
    this.tasks.update((prev) => prev.filter((t) => t.id !== id));
    this.toast.show('Tarea eliminada', 'success');
  }
}
