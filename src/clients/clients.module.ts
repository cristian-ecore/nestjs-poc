import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { CepConsultModule } from '../cep-consult/cep-consult.module';
import { ClientsRepositoryModule } from 'src/data/mongoDB/clients/clients.repository.module';
// import { ClientsRepositoryModule } from 'src/data/postgres/clients/client.repository.module';

@Module({
  imports: [
    ClientsRepositoryModule,
    CepConsultModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
