import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import {createMock} from 'ts-auto-mock';
import { CreateClientDto } from './dto/create-client.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let clientServiceMock: ClientsService;

  const fakeClient = {
    name: "any_name",
    birthDate: "any_birthDate",
    email: "any_email",
    cep: "any_cep",
    _id: "any_id",
    __v: 0
}


  clientServiceMock = createMock<ClientsService>({
    create: jest.fn().mockReturnValue(fakeClient),
    findAll: jest.fn().mockReturnValue([fakeClient]),
    findOne: jest.fn().mockReturnValue(fakeClient),
    remove: jest.fn().mockReturnValue(null),
    update: jest.fn().mockReturnValue(null),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [{
        provide: ClientsService,
        useValue: clientServiceMock,
      }],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('clients service test', () => {
    it('should create a valid client', async() => {
      const spy = jest.spyOn(clientServiceMock, 'create')

      const mockPayload = createMock<CreateClientDto>();

      const response = await controller.create(mockPayload);

      expect(spy).toHaveBeenCalledWith(mockPayload);
      expect(response).toEqual(fakeClient);
    });

    it('should return a array of clients', async() => {
      const spy = jest.spyOn(clientServiceMock, 'findAll')

      const response = await controller.findAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([fakeClient]);
    });

    it('should return a client by id', async() => {
      const spy = jest.spyOn(clientServiceMock, 'findOne')

      const response = await controller.findOne('any_id');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('any_id');
      expect(response).toEqual(fakeClient);
    });

    it('should update a client by id', async() => {
      const spy = jest.spyOn(clientServiceMock, 'update')

      const response = await controller.update('any_id', {name: 'any_name_updated'});

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('any_id', {name: 'any_name_updated'});
      expect(response).toEqual(null);
    });

    it('should delete a client by id', async() => {
      const spy = jest.spyOn(clientServiceMock, 'remove')

      const response = await controller.remove('any_id');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('any_id');
      expect(response).toEqual(null);
    });
  });
});
