import { Test, TestingModule } from '@nestjs/testing';
import { CepConsultService } from './cep-consult.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CepConsultService', () => {
  let service: CepConsultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepConsultService],
    }).compile();

    service = module.get<CepConsultService>(CepConsultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true for a valid cep', async () => {

    mockedAxios.get.mockResolvedValueOnce({data: {cep: 'any_cep'}})

    const response = await service.validCep('any_cep');

    expect(response).toBe(true);
    
  });

  it('should return false for a invalid cep', async () => {

    mockedAxios.get.mockResolvedValueOnce({data: {erro: 'any_cep'}})

    const response = await service.validCep('any_cep');

    expect(response).toBe(false);
    
  });
});
