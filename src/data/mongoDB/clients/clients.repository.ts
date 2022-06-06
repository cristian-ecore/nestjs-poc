import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './client.schema';
import { ClientsRepositoryInterface } from 'src/data/interfaces/clients.repository.interface';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';

@Injectable()
export class ClientsRepository implements ClientsRepositoryInterface {
  constructor(
    @InjectModel('Client') private clientModel: Model<Client>,
  ){}

  async create(data: CreateClientDto): Promise<Client> {
    return await this.clientModel.create(data);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  async findById(id: string): Promise<Client> {
    return await this.clientModel.findById(id);
  }

  async update(id: string, data: Partial<CreateClientDto>): Promise<void> {
     await this.clientModel.updateOne({
      _id: id
    }, data);
  }

  async delete(id: string): Promise<void> {
     await this.clientModel.deleteOne({
      _id: id
    });
  }
}
