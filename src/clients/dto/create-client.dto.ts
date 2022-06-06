import { IsDateString, IsNotEmpty, IsString,  } from 'class-validator'

export class CreateClientDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDateString()
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    cep: string;
}
