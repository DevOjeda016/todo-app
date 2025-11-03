import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Importance } from '../enums/importance.enums';
import { Status } from '../enums/status.enums';

@Entity('tasks')
@Index(['status', 'importance']) // Composite index for completed and importance fields
export class Task {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier (UUID) for the task

  @Expose()
  @Column({ length: 200 })
  title: string; // Short title or name of the task

  @Expose()
  @Column({
    type: 'enum',
    enum: Importance,
    default: Importance.NOTHING,
  })
  importance: Importance; // Task importance level (enum)

  @Expose()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TODO,
  })
  status: Status; // Task status (enum)

  @Expose()
  @Column({ type: 'text', nullable: true })
  description?: string; // Detailed description of the task (optional)

  @Expose()
  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date; // Optional due date and time for the task

  @Expose()
  @Column({ type: 'int', nullable: true })
  estimatedMinutes?: number; // Estimated time to complete the task in minutes (optional)

  @Expose()
  @Column('simple-array', { nullable: true })
  tags?: string[]; // Simple array of tags to categorize the task (optional)

  @Expose()
  @Column({ default: false })
  archived: boolean; // Whether the task is archived or not

  @Expose()
  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the task was created

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date; // Timestamp of the last update to the task

  @DeleteDateColumn()
  deletedAt?: Date; // Timestamp for soft deletion (null if not deleted)
}
