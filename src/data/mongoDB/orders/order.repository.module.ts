import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';
import { OrderRepository } from './order.repository';

const provider = {
  provide: 'OrderRepository',
  useClass: OrderRepository
};


@Module({
  imports: [
    MongooseModule.forFeature([
    { name: 'Order', schema: OrderSchema }
    ]),
  ],
  providers: [provider],
  exports: [provider],
})
export class OrdersRepositoryModule {}
