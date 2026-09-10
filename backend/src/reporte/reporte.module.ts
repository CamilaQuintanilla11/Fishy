import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ReporteController} from './reporte.controller';
import {ReporteRepository} from './reporte.repository';
import { ReporteService} from './reporte.service';
import { RiesgoModule } from 'src/riesgo/riesgo.module';
import { EstadoModule } from 'src/estado/estado.module';

@Module({
  imports:[DatabaseModule, EstadoModule, RiesgoModule],
  controllers:[ReporteController],
  providers:[ReporteService, ReporteRepository],
})
export class ReporteModule {}