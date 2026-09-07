import { Reporte } from '../entities/reporte.entity';
export class ReporteResponseDto {
  id: string;
  descripcion:string;
  nivel_riesgo:string;
  fecha_pub: string;
  fecha_update:string;
  fecha_aprob:string | null;
  perteneceA:string;
  tieneEstado: string;
  static fromEntity(reporte: Reporte):ReporteResponseDto{
    const dto=new ReporteResponseDto();
    dto.id =reporte.id;
    dto.descripcion= reporte.descripcion;
    dto.nivel_riesgo= reporte.nivel_riesgo;
    dto.fecha_pub=reporte.fecha_pub.toISOString();
    dto.fecha_update=reporte.fecha_update.toISOString();
    dto.fecha_aprob =reporte.fecha_aprob? reporte.fecha_aprob.toISOString(): null;
    dto.perteneceA=reporte.perteneceA;
    dto.tieneEstado=reporte.tieneEstado;
    return dto;
  }
}