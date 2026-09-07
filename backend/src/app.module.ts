import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    DatabaseModule,
    RolModule,
    UsuarioModule,
  ],
})
export class AppModule {}