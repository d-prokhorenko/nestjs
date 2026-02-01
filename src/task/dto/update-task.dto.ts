import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Task title should be a string' })
  @IsNotEmpty({ message: 'Task title should not be empty' })
  @Length(2, 40, { message: 'Task title should be from 2 to 40 symbols' })
  title: string;

  @IsBoolean({ message: 'Task status should be a boolean' })
  isCompleted: boolean;
}
