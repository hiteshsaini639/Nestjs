import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './items/gaurds/auth.gaurd';
import { LoggingInterCeptor } from './items/interceptor/logging.inteceptor';
import { RequestService } from './items/request.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global pipes
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
  //for global interceptor
  // app.useGlobalInterceptors(new LoggingInterCeptor());

  // for global guard
  // app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
