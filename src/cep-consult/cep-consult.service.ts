import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CepConsultService {
    async validCep(cep: string): Promise<boolean>{
        const cepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        if(cepResponse.data.erro){
            return false;
        }

        return true;
    }
}
