import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import {MongoProviderModule} from './data/mongoDB/mongo.provider.module'
// import {PostgresProviderModule} from './data/postgres/postgres.provider.module'
import { OrdersModule } from './orders/orders.module';
import { CepConsultModule } from './cep-consult/cep-consult.module';
import 'dotenv/config';


@Module({
  imports: [
    MongoProviderModule,
    ClientsModule,
    OrdersModule,
    CepConsultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}