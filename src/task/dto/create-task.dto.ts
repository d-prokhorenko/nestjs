import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  title: string;

  @IsString({ message: 'Task description should be a string' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Task priority should be an integer number' })
  @IsPositive({ message: 'Task priority should be a positive integer' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Task tags should be an array' })
  @IsEnum(TaskTag, { message: 'Invalid tag value', each: true })
  @IsOptional()
  tags: TaskTag[];
}
