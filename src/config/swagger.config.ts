import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Swagger Documentation')
    .setDescription('Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
