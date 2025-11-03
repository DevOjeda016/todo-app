import { Importance, Status } from '../enums';

export interface Task {
  id: string;
  title: string;
  importance: Importance;
  status: Status;
  description?: string;
  dueDate?: string; // ISO date string from backend
  estimatedMinutes?: number;
  tags?: string[];
  archived: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
