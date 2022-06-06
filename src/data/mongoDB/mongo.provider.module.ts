import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ClientsRepositoryModule} from './clients/clients.repository.module';
import {OrdersRepositoryModule} from './orders/order.repository.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ClientsRepositoryModule,
    OrdersRepositoryModule
  ],
  exports: [ClientsRepositoryModule,OrdersRepositoryModule],
})
export class MongoProviderModule {}
