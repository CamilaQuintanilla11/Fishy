import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './usuario.repository';
import { RolModule } from '../rol/rol.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [RolModule, DatabaseModule], 
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioRepository], 
})
export class UsuarioModule {}
