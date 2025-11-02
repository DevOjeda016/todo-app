import {
  IsEnum,
  IsOptional,
  IsString,
  IsInt,
  IsDateString,
  IsArray,
  MaxLength,
  Min,
} from 'class-validator';
import { Importance } from '../enums/importance.enums';
import { Status } from '../enums/status.enums';

export class CreateTaskDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsEnum(Importance)
  importance?: Importance;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  estimatedMinutes?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
