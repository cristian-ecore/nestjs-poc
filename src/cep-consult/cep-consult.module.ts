import { Module } from '@nestjs/common';
import { CepConsultService } from './cep-consult.service';

@Module({
  providers: [CepConsultService],
  exports: [CepConsultService]
})
export class CepConsultModule {}
