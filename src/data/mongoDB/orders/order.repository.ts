import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './order.schema';
import { Order } from 'src/orders/entities/order.entity';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { OrdersRepositoryInterface } from 'src/data/interfaces/orders.repository.interface';

@Injectable()
export class OrderRepository implements OrdersRepositoryInterface {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
  ){}

  async create(data: CreateOrderDto): Promise<Order> {
    return await this.orderModel.create(data);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  async findById(id: string): Promise<Order> {
    return await this.orderModel.findById(id).populate('client');
  }

  async update(id: string, data: UpdateOrderDto): Promise<void> {
     await this.orderModel.updateOne({
      _id: id
    }, data);
  }

  async delete(id: string): Promise<void> {
     await this.orderModel.deleteOne({
      _id: id
    });
  }
}
