import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderModel } from './order.model';
import { Order } from 'src/orders/entities/order.entity';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { OrdersRepositoryInterface } from 'src/data/interfaces/orders.repository.interface';

@Injectable()
export class OrderRepository implements OrdersRepositoryInterface {
  constructor(
    @InjectRepository(OrderModel) private orderModel: Repository<OrderModel>,
  ){}

  async create(data: CreateOrderDto): Promise<Order> {
    return await this.orderModel.save(data);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  async findById(id: string): Promise<Order> {
    return await this.orderModel.findOne(id, {
      relations: ['client'] 
    })
  }

  async update(id: string, data: UpdateOrderDto): Promise<void> {
     await this.orderModel.update(id, {
      itens: data.itens,
    });
  }

  async delete(id: string): Promise<void> {
     await this.orderModel.delete(id);
  }
}
