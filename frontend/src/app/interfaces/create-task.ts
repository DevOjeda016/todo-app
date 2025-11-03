import { Importance } from '../../enums/importance.enums';
import { Status } from '../../enums/status.enums';

export interface CreateTask {
  title: string;

  importance?: Importance;

  status?: Status;

  description?: string;

  dueDate?: string;

  estimatedMinutes?: number;

  tags?: string[];
}
