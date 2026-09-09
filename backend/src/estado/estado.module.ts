import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { EstadoRepository } from './estado.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [EstadoController],
    providers: [EstadoService, EstadoRepository],
    exports: [EstadoRepository],
})
export class EstadoModule {}