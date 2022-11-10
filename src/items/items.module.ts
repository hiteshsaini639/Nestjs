import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.shemas';
import { AuthenticationMiddleware } from './middleware/auth.middleware';
import { RequestService } from './request.service';
import { AuthGuard } from './gaurds/auth.gaurd';
import { LoggingInterCeptor } from './interceptor/logging.inteceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    RequestService,

    // for global guard with dependency injection
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_INTERCEPTOR',
      scope: Scope.REQUEST,
      useClass: LoggingInterCeptor,
    },
    // {
    //   provide: 'APP_FILTER',
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class ItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
