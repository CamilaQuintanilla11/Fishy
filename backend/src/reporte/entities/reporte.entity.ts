export class Reporte{
    id:number;
    usuario_id:number;
    estado_id:number;
    descripcion:string;
    nivel_riesgo:string;
    fecha_publicacion: Date;
    fecha_update: Date;
    fecha_aprobacion?:Date;
}