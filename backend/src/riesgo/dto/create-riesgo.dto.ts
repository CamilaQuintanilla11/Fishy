import {IsNotEmpty, IsString,} from 'class-validator';

export class CreateRiesgoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}