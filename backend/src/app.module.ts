import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [
    EstadoModule,
    CategoriaModule,
    DatabaseModule,
    RolModule,
    UsuarioModule,
  ],
})
export class AppModule {}