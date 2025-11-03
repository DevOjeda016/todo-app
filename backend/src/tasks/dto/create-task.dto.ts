import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Título de la tarea', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({
    description: 'Nivel de importancia',
    enum: Importance,
    default: Importance.NOTHING,
  })
  @IsOptional()
  @IsEnum(Importance)
  importance?: Importance;

  @ApiPropertyOptional({
    description: 'Estado de la tarea',
    enum: Status,
    default: Status.TODO,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({ description: 'Descripción detallada' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Fecha límite (ISO 8601)',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Tiempo estimado en minutos',
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  estimatedMinutes?: number;

  @ApiPropertyOptional({
    description: 'Etiquetas para categorizar',
    type: [String],
    example: ['trabajo', 'urgente'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
