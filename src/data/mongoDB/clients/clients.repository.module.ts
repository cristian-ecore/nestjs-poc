import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './client.schema';
import { ClientsRepository } from './clients.repository';

const provider = {
  provide: 'ClientsRepository',
  useClass: ClientsRepository
}

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: 'Client', schema: ClientSchema }
    ]),
  ],
  providers: [provider],
  exports: [provider],
})
export class ClientsRepositoryModule {}
