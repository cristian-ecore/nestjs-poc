import { Client } from "src/clients/entities/client.entity"
import { CreateClientDto } from "src/clients/dto/create-client.dto"
import { UpdateClientDto } from "src/clients/dto/update-client.dto"


export interface ClientsRepositoryInterface {
     create(payload: CreateClientDto): Promise<Client>
     findAll(): Promise<Client[]>
     findById(id: string): Promise<Client>
     update(id: string, payload: UpdateClientDto): Promise<void>
     delete(id: string): Promise<void>
}