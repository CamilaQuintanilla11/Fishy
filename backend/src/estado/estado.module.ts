import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { EstadoRepository } from './estado.repository';

@Module({
    controllers: [EstadoController],
    providers: [EstadoService, EstadoRepository],
    exports: [EstadoRepository],
})
export class EstadoModule {}