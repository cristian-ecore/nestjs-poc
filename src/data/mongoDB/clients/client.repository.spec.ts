import { Test, TestingModule } from '@nestjs/testing';
import {createMock, createHydratedMock} from 'ts-auto-mock'
import { CreateClientDto } from '../../../clients/dto/create-client.dto';
import { getModelToken } from '@nestjs/mongoose';
import {ClientsRepository} from './clients.repository';

describe('ClientsRepository', () => {

  let repository: ClientsRepository;

  const fakeClient = {
    name: "any_name",
    birthDate: "any_birthDate",
    email: "any_email",
    cep: "any_cep",
    _id: "any_id",
    __v: 0
}

  let clientModelMock = {
    create: jest.fn().mockReturnValue(fakeClient),
    find: jest.fn().mockReturnValue([fakeClient]),
    findById: jest.fn().mockReturnValue(fakeClient),
    updateOne: jest.fn(),
    remove: jest.fn(),
  };
  

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({       
      providers: [
        ClientsRepository,
        {
          provide: getModelToken('Client'),
          useValue: clientModelMock
        }
      ],
    }).compile();

    repository = module.get<ClientsRepository>(ClientsRepository);
  });

  const mockPayload = createMock<CreateClientDto>();

  it('should be defined', () => {
    expect(clientModelMock).toBeDefined();
  });

  it('should return a created client', async() => {
    const spy = jest.spyOn(clientModelMock, 'create');

    const response = await repository.create(mockPayload);

    expect(spy).toBeCalledWith(mockPayload);
    expect(response).toEqual(fakeClient)
  });

  // it('should be throw a badRequest if a invalid cep is passed', async() => {
  //   jest.spyOn(cepConsultServiceMock, 'validCep').mockReturnValue(new Promise((resolve) => resolve(false)))

  //   const response = service.create(mockPayload);

  //   expect(response).rejects.toThrowError(new BadRequestException('cep invalido'));
  // });

  it('should return all clients', async() => {
    const spy = jest.spyOn(clientModelMock, 'find');

    const response = await repository.findAll();

    expect(spy).toBeCalledTimes(1);
    expect(response).toEqual([fakeClient])
  });

  // it('should return a client by id', async() => {
  //   const spy = jest.spyOn(clientModelMock, 'findById').mockReturnValueOnce(fakeClient);

  //   const response = await service.findOne('any_id');

  //   expect(spy).toBeCalledTimes(1);
  //   expect(spy).toBeCalledWith('any_id');
  //   expect(response).toEqual(fakeClient)
  // });

  // it('should throw a NotFoundException if dont find a client by id', async() => {
  //   jest.spyOn(clientModelMock, 'findById').mockReturnValueOnce(null);

  //   const response = service.findOne('any_id');

  //   await expect(response).rejects.toBeInstanceOf(NotFoundException);
  //   await expect(response).rejects.toThrowError(new NotFoundException('Cliente não encontrado'));
  // });

  // it('should update a client by id', async() => {
  //   const spy = jest.spyOn(clientModelMock, 'updateOne');

  //   const response = await service.update('any_id', {
  //     name: 'cristian updated'
  //   });

  //   expect(spy).toBeCalledTimes(1);
  //   expect(spy).toBeCalledWith({_id: 'any_id'}, {name: 'cristian updated'});
  //   expect(response).toEqual(undefined)
  // });

  // it('should delete a client by id', async() => {
  //   const spy = jest.spyOn(clientModelMock, 'remove');

  //   const response = await service.remove('any_id');

  //   expect(spy).toBeCalledTimes(1);
  //   expect(spy).toBeCalledWith({_id: 'any_id'});
  //   expect(response).toEqual(undefined);
  // });
});
