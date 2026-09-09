import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { RolRepository } from './rol.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RolController],
  providers: [RolService, RolRepository],
  exports: [RolRepository],
})
export class RolModule {}
