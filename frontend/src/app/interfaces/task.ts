import { Importance } from '../../enums/importance.enums';
import { Status } from '../../enums/status.enums';

export interface Task {
  id: string;
  importance: Importance;
  status: Status;
  description?: string;
  dueDate?: Date;
  estimatedMinutes?: number;
  tags?: string[];
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
