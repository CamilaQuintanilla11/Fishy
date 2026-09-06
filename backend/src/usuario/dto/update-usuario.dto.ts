import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
