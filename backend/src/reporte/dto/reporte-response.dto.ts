import { Reporte } from '../entities/reporte.entity';
export class ReporteResponseDto{
    id: number;
    usuario_id:number;
    estado_id:number;
    descripcion:string;
    nivel_riesgo:string;
    fecha_publicacion:string;
    fecha_update:string;
    fecha_aprobacion:string|null;
    static fromEntity(reporte:Reporte): ReporteResponseDto{
        const dto:new ReporteResponseDto();
        dto.id=reporte.id;
        dto.usuario_id=reporte.usuario_id;
        dto.estado_id = reporte.estado_id;
        dto.descripcion = reporte.descripcion;
        dto.nivel_riesgo = reporte.nivel_riesgo;
        dto.fecha_publicacion = reporte.fecha_publicacion.toISOString();
        dto.fecha_update = reporte.fecha_update.toISOString();
        dto.fecha_aprobacion = reporte.fecha_aprobacion
            ? reporte.fecha_aprobacion.toISOString()
            : null;
        return dto;
    }
}