import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { microserviceConfig } from './config/microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceConfig,
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
void bootstrap();
