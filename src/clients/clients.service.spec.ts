import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { CepConsultService } from '../cep-consult/cep-consult.service';
import {createMock} from 'ts-auto-mock'
import { CreateClientDto } from './dto/create-client.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ClientsRepositoryInterface } from 'src/data/interfaces/clients.repository.interface';
import { Client } from './entities/client.entity';

describe('ClientsService', () => {
  let service: ClientsService;
  let cepConsultServiceMock: CepConsultService;
  let clientRepositoryMock: ClientsRepositoryInterface

  cepConsultServiceMock = createMock<CepConsultService>();

  const fakeClient: Client = createMock<Client>();

  clientRepositoryMock = createMock<ClientsRepositoryInterface>({
    create: jest.fn().mockReturnValue(fakeClient),
    findAll: jest.fn().mockReturnValue([fakeClient]),
    findById: jest.fn().mockReturnValue(fakeClient),
    delete: jest.fn().mockReturnValue(null),
    update: jest.fn().mockReturnValue(null),
  });
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({                                       
      providers: [
        ClientsService,
        {
          provide: CepConsultService,
          useValue: cepConsultServiceMock
        },
        {
          provide: 'ClientsRepository',
          useValue: clientRepositoryMock
        }
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  const mockPayload = createMock<CreateClientDto>();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a created client', async() => {
    jest.spyOn(cepConsultServiceMock, 'validCep').mockReturnValue(new Promise((resolve) => resolve(true)))
    const spy = jest.spyOn(clientRepositoryMock, 'create');

    const response = await service.create(mockPayload);

    expect(spy).toBeCalledWith(mockPayload);
    expect(response).toEqual(fakeClient)
  });

  it('should be throw a badRequest if a invalid cep is passed', async() => {
    jest.spyOn(cepConsultServiceMock, 'validCep').mockReturnValue(new Promise((resolve) => resolve(false)))

    const response = service.create(mockPayload);

    expect(response).rejects.toThrowError(new BadRequestException('cep invalido'));
  });

  it('should return all clients', async() => {
    const spy = jest.spyOn(clientRepositoryMock, 'findAll');

    const response = await service.findAll();

    expect(spy).toBeCalledTimes(1);
    expect(response).toEqual([fakeClient])
  });

  it('should return a client by id', async() => {
    const spy = jest.spyOn(clientRepositoryMock, 'findById').mockReturnValueOnce(new Promise((resolve) => resolve(fakeClient)));

    const response = await service.findOne('any_id');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('any_id');
    expect(response).toEqual(fakeClient)
  });

  it('should throw a NotFoundException if dont find a client by id', async() => {
    jest.spyOn(clientRepositoryMock, 'findById').mockReturnValueOnce(null);

    const response = service.findOne('any_id');

    await expect(response).rejects.toBeInstanceOf(NotFoundException);
    await expect(response).rejects.toThrowError(new NotFoundException('Cliente não encontrado'));
  });

  it('should update a client by id', async() => {
    const spy = jest.spyOn(clientRepositoryMock, 'update');

    const response = await service.update('any_id', {
      name: 'cristian updated'
    });

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('any_id', {name: 'cristian updated'});
    expect(response).toEqual(undefined)
  });

  it('should delete a client by id', async() => {
    const spy = jest.spyOn(clientRepositoryMock, 'delete');

    const response = await service.remove('any_id');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith( 'any_id');
    expect(response).toEqual(undefined);
  });
});
