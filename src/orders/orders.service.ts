import { BadRequestException, Inject, Injectable, NotFoundException,  } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepositoryInterface } from 'src/data/interfaces/orders.repository.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository') private orderRepository: OrdersRepositoryInterface,
    private readonly clientsService: ClientsService
  ){}

  async create(createClientDto: CreateOrderDto): Promise<Order> {

    const client = await this.clientsService.findOne(createClientDto.clientId);

    if(!client){
      throw new BadRequestException('o cliente informado nao existe')
    }

    return await this.orderRepository.create(createClientDto);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async findOne(id: string): Promise<Order> {

    const order = await this.orderRepository.findById(id);

    if(!order){
      throw new NotFoundException('Pedido não encontrado');
    }
    return order;
  }

  async update(id: string, updateClientDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateClientDto);
  }

  async remove(id: string) {
    return await this.orderRepository.delete(id);
  }
}
