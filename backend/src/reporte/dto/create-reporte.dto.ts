import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReporteDto {
  @IsString()
  @IsNotEmpty()
  perteneceA:string;
  @IsString()
  @IsNotEmpty()
  descripcion:string;
  @IsString()
  @IsNotEmpty()
  nivel_riesgo:string;
}