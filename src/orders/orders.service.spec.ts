import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from '../clients/clients.service';
import { createMock, createHydratedMock } from 'ts-auto-mock';
import { OrderDocument } from '../data/mongoDB/orders/order.schema';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import {ClientDocument} from '../data/mongoDB/clients/client.schema'
import { CreateOrderDto } from './dto/create-order.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrdersRepositoryInterface } from 'src/data/interfaces/orders.repository.interface';

describe('OrdersService', () => {
  let service: OrdersService;
  let clientServiceMock: ClientsService;
  let orderRepositoryMock: OrdersRepositoryInterface

  const fakeOrder: Order = createMock<Order>();
  
  clientServiceMock = createMock<ClientsService>();

  orderRepositoryMock = createMock<OrdersRepositoryInterface>({
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ClientsService,
          useValue: clientServiceMock
        },
        {
          provide: 'OrderRepository',
          useValue: orderRepositoryMock
        }
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  const mockPayload = createMock<CreateOrderDto>();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a created order', async() => {
    const fakeClient = createMock<ClientDocument>();

    jest.spyOn(clientServiceMock, 'findOne').mockReturnValue(new Promise((resolve) => resolve(fakeClient)));

    const spy = jest.spyOn(orderRepositoryMock, 'create').mockImplementationOnce(() => 
      Promise.resolve(fakeOrder)
    )

    const response = await service.create(mockPayload);

    expect(spy).toBeCalledWith(mockPayload);
    expect(response).toEqual(fakeOrder)
  });

  it('should be throw a badRequest if a invalid client is passed', async() => {
    jest.spyOn(clientServiceMock, 'findOne').mockReturnValue(new Promise((resolve) => resolve(null)))

    const response = service.create(mockPayload);

    expect(response).rejects.toThrowError(new BadRequestException('o cliente informado nao existe'));
  });

  it('should return all orders', async() => {
    const spy = jest.spyOn(orderRepositoryMock, 'findAll').mockReturnValueOnce(new Promise(resolve => resolve([fakeOrder])));

    const response = await service.findAll();

    expect(spy).toBeCalledTimes(1);
    expect(response).toEqual([fakeOrder])
  });

  it('should return a order by id', async() => {
    const fakeOrderPopulated: Order = createMock<Order>({
      client: {
        _id: 'any_id',
        name: 'any_name',
        email: "any_email",
        birthDate: 'any_birthDate',
        cep: 'any_cep'
      }
    });
    const spy = jest.spyOn(orderRepositoryMock, 'findById').mockReturnValueOnce(new Promise((resolve) => resolve(fakeOrderPopulated)));
    

    const response = await service.findOne('any_id');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('any_id');
    expect(response).toEqual(fakeOrderPopulated)
  });

  it('should throw a NotFoundException if dont find a client by id', async() => {
    jest.spyOn(orderRepositoryMock, 'findById').mockReturnValueOnce(null);

    const response = service.findOne('any_id');

    await expect(response).rejects.toBeInstanceOf(NotFoundException);
    await expect(response).rejects.toThrowError(new NotFoundException('Pedido não encontrado'));
  });

  it('should update a order by id', async() => {
    const spy = jest.spyOn(orderRepositoryMock, 'update');

    const response = await service.update('any_id', {
      itens: [
        'any_item_updated'
      ]
    });

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('any_id', { itens: ['any_item_updated']});
    expect(response).toEqual(undefined)
  });

  it('should delete a order by id', async() => {
    const spy = jest.spyOn(orderRepositoryMock, 'delete');

    const response = await service.remove('any_id');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('any_id');
    expect(response).toEqual(undefined);
  });
});
