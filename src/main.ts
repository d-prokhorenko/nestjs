import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest Course API')
    .setDescription('API documentation for Nest courseI')
    .setVersion('1.0.0')
    .setContact(
      'Denis Team',
      'https://localhost:8080',
      'support@localhost:8080',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
  });

  SwaggerModule.setup('docs', app, document);

  app.use(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
