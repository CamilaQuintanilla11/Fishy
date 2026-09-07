export class Reporte {
  id: string;
  descripcion: string;
  nivel_riesgo: string;
  fecha_pub: Date;
  fecha_update: Date;
  fecha_aprob?: Date;
  perteneceA: string;
  tieneEstado: string;
}
