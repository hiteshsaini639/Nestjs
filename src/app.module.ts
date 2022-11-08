import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [
    ItemModule,
    MongooseModule.forRoot(config.mongoURI, { dbName: 'test' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// imports: [
//   MongooseModule.forRoot({
//      uri: 'mongodb://admin:admin@localhost:30000',
//      dbName: 'data'
//   }),
// ]
