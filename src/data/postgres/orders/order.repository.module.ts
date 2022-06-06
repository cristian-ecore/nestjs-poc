import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './order.model';
import { OrderRepository } from './order.repository';

const provider = {
  provide: 'OrderRepository',
  useClass: OrderRepository
};


@Module({
  imports: [TypeOrmModule.forFeature([OrderModel])],
  providers: [provider],
  exports: [provider]
})
export class OrdersRepositoryModule {}
