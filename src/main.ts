import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = {
          statusCode: 400,
          message: errors[0].constraints[Object.keys(errors[0].constraints)[0]],
          error: 'Bad Request',
        };
        return new BadRequestException(errorMessages);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
