import { Exclude, Expose } from 'class-transformer';
import { Importance } from '../enums/importance.enums';
import { Status } from '../enums/status.enums';

@Exclude()
export class TaskSerializer {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  importance: Importance;

  @Expose()
  status: Status;

  @Expose()
  description?: string;

  @Expose()
  dueDate?: Date;

  @Expose()
  estimatedMinutes?: number;

  @Expose()
  tags?: string[];

  @Expose()
  archived: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
