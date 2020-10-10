import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Valid input
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
