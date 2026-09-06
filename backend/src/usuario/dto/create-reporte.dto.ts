import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateReporteDto{
    @IsNotEmpty()
    usuario_id:number;
    @IsString()
    @IsNotEmpty()
    descripcion:string;
    @IsString()
    @IsNotEmpty()
    nivel_riesgo:string;
}