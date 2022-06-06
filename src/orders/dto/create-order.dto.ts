import { ArrayMinSize, IsArray, IsDateString, IsString } from 'class-validator'

export class CreateOrderDto {
    @IsDateString()
    createdAt: Date;

    @IsArray()
    @ArrayMinSize(1)
    itens: string[];

    @IsString()
    clientId: string;
}
