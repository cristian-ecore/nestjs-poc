import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let orderServiceMock: OrdersService;

  const fakeOrder: Order = createMock<Order>();

  orderServiceMock = createMock<OrdersService>({
    create: jest.fn().mockReturnValue(fakeOrder),
    findAll: jest.fn().mockReturnValue([fakeOrder]),
    findOne: jest.fn().mockReturnValue(fakeOrder),
    remove: jest.fn().mockReturnValue(null),
    update: jest.fn().mockReturnValue(null),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{
        provide: OrdersService,
        useValue: orderServiceMock
      }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('orders service test', () => {
    it('should create a valid client', async() => {
      const spy = jest.spyOn(orderServiceMock, 'create')

      const mockPayload = createMock<CreateOrderDto>();

      const response = await controller.create(mockPayload);

      expect(spy).toHaveBeenCalledWith(mockPayload);
      expect(response).toEqual(fakeOrder);
    });

    it('should return a array of clients', async() => {
      const spy = jest.spyOn(orderServiceMock, 'findAll')

      const response = await controller.findAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([fakeOrder]);
    });

    it('should return a client by id', async() => {
      const spy = jest.spyOn(orderServiceMock, 'findOne')

      const response = await controller.findOne('any_id');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('any_id');
      expect(response).toEqual(fakeOrder);
    });

    it('should update a client by id', async() => {
      const spy = jest.spyOn(orderServiceMock, 'update')

      const response = await controller.update('any_id', {itens: ['any_item']});

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('any_id', {itens: ['any_item']});
      expect(response).toEqual(null);
    });

    it('should delete a client by id', async() => {
      const spy = jest.spyOn(orderServiceMock, 'remove')

      const response = await controller.remove('any_id');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('any_id');
      expect(response).toEqual(null);
    });
  });
});
