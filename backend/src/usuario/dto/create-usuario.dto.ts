import {
    IsEmail, 
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator'

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(10)
  contrasena: string;

  @IsOptional()
  @IsIn(['usuario', 'admin'])
  rol?: string;
}
