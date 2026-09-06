import { PartialType } from '@nestjs/mapped-types';
import { CreateReporteDto } from './create-reporte.dto';

export class UpdateReporte extends PartialType(CreateReporteDto){
    @IsOptional()
    estado_id?:number;
}