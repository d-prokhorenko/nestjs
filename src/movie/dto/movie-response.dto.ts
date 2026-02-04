import { ApiProperty } from '@nestjs/swagger';

export class MovieResponse {
  @ApiProperty({
    description: 'Movie id',
    example: '123456',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Movie name',
    example: 'Fight Club',
    type: String,
  })
  title: string;
}
