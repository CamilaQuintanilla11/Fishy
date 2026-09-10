import { IsEmail, IsNotEmpty, IsString, MinLength,} from 'class-validator';

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
