import { Client } from "src/clients/entities/client.entity";

export class Order{
    createdAt: Date;
    itens: string[];
    client: Client
    id?: string;
}
