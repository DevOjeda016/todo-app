import { Importance, Status } from '../enums';

export interface CreateTask {
  title: string;

  importance?: Importance;

  status?: Status;

  description?: string;

  dueDate?: string;

  estimatedMinutes?: number;

  tags?: string[];
}
