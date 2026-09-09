import {
    IsEmail, 
    IsNotEmpty,
    IsOptional,
    IsString,
    IsIn,
    MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(10)
  contrasena: string;
}
