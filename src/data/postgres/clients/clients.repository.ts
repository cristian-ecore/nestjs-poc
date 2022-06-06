import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {  ClientModel } from './client.model';
import { ClientsRepositoryInterface } from 'src/data/interfaces/clients.repository.interface';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class ClientsRepository implements ClientsRepositoryInterface {
  constructor(
    @InjectRepository(ClientModel) private clientRepository: Repository<ClientModel>,
  ){}

  async create(data: Client): Promise<Client> {
    return await this.clientRepository.save(data);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findById(id: string): Promise<Client> {
    return await this.clientRepository.findOne(id);
  }

  async update(id: string, data: Partial<Client>): Promise<void> {
     await this.clientRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
     await this.clientRepository.delete(id);
  }
}
