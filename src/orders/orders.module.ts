import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule } from '../clients/clients.module';
import { OrdersRepositoryModule } from 'src/data/mongoDB/orders/order.repository.module';
// import {OrdersRepositoryModule} from '../data/postgres/orders/order.repository.module'

@Module({
  imports: [
   OrdersRepositoryModule,
   ClientsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
