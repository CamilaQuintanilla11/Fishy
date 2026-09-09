import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ReporteController} from './reporte.controller';
import {ReporteRepository} from './reporte.repository';
import { ReporteService} from './reporte.service';

@Module({
  imports:[DatabaseModule],
  controllers:[ReporteController],
  providers:[ReporteService, ReporteRepository],
})
export class ReporteModule {}