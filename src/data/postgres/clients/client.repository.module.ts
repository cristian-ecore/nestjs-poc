import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModel } from './client.model';
import { ClientsRepository } from './clients.repository';

const provider = {
    provide: 'ClientsRepository',
    useClass: ClientsRepository
  }

@Module({
  imports: [TypeOrmModule.forFeature([ClientModel])],
  providers: [provider],
  exports: [provider]
})
export class ClientsRepositoryModule {}