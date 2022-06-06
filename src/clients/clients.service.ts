import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {Client} from './entities/client.entity';
import { CepConsultService } from '../cep-consult/cep-consult.service';
import { ClientsRepositoryInterface } from 'src/data/interfaces/clients.repository.interface';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('ClientsRepository') private clientRepository: ClientsRepositoryInterface,
    private readonly cepConsult: CepConsultService
  ){}

  async create(createClientDto: CreateClientDto): Promise<Client> {

    const cepIsValid = await this.cepConsult.validCep(createClientDto.cep);

    if(!cepIsValid){
      throw new BadRequestException('cep invalido');
    }

    return await this.clientRepository.create(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  async findOne(id: string): Promise<Client> {

    const client = await this.clientRepository.findById(id);

    if(!client){
      throw new NotFoundException('Cliente não encontrado');
    }

    return client
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<void> {
     await this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: string): Promise<void> {
     await this.clientRepository.delete(id);
  }
}
