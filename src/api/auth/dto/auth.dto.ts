import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT token',
    example: 'token',
  })
  accessToken: string;
}
