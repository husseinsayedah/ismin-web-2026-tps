import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

import type { Task } from '../model.js';

const TASKS = [
  'text-generation',
  'translation',
  'image-classification',
  'speech-to-text',
] as const satisfies readonly Task[];

export class CreateModelDto {
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  org!: string;

  @IsIn(TASKS)
  task!: Task;

  @IsNumber()
  @Min(0)
  parameters!: number;

  @IsInt()
  @Min(0)
  downloads!: number;

  @IsOptional()
  @IsString()
  license?: string;
}