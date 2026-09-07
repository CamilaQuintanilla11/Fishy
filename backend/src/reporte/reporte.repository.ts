import { Inject, Injectable } from '@nestjs/common';
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DB_POOL } from '../database/database.module';
import { Reporte } from './entities/reporte.entity';

const COLUMNS ='id, usuario_id, estado_id, descripcion, nivel_riesgo, fecha_publicacion, fecha_update, fecha_aprobacion';

@Injectable()
export class ReporteRepository {
  constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

  async findAll():Promise<Reporte[]> {
    const [rows]=await this.pool.query<RowDataPacket[]>(
      `SELECT ${COLUMNS} FROM reporte ORDER BY fecha_publicacion DESC`,
    );
    return rows.map(toEntity);
  }

  async findById(id: number):Promise<Reporte | undefined> {
    const [rows]=await this.pool.query<RowDataPacket[]>(
      `SELECT ${COLUMNS} FROM reporte WHERE id = ${id}`,
    );
    return rows[0] && toEntity(rows[0]);
  }

  async findEstadoIdByNombre(nombre: string): Promise<number | undefined> {
    const [rows]=await this.pool.query<RowDataPacket[]>(
      `SELECT id FROM estado WHERE nombre_estado = '${nombre}'`,
    );
    return rows[0]?.id;
  }

  async save(data:{usuario_id: number; estado_id: number; descripcion: string;nivel_riesgo: string;}): Promise<Reporte> {
    const [result] =await this.pool.query<ResultSetHeader>(
      `INSERT INTO reporte (usuario_id, estado_id, descripcion, nivel_riesgo)
       VALUES(${data.usuario_id}, ${data.estado_id}, '${data.descripcion}', '${data.nivel_riesgo}')`,
    );
    return (await this.findById(result.insertId))!;
  }

  async update(id: number, changes: Partial<Reporte>, ):Promise<Reporte| undefined> {
    const sets=Object.entries(changes).map(([column, value]) => `${column} = '${value}'`).join(', ');
    await this.pool.query(`UPDATE reporte SET ${sets} WHERE id = ${id}`);
    return this.findById(id);
  }

  async delete(id:number):Promise<boolean>{
    const [result] =await this.pool.query<ResultSetHeader>(
      `DELETE FROM reporte WHERE id = ${id}`,
    );
    return result.affectedRows >0;
  }
}

function toEntity(row:any): Reporte{
  const reporte= new Reporte();
  reporte.id= row.id;
  reporte.usuario_id =row.usuario_id;
  reporte.estado_id=row.estado_id;
  reporte.descripcion= row.descripcion;
  reporte.nivel_riesgo= row.nivel_riesgo;
  reporte.fecha_publicacion = row.fecha_publicacion;
  reporte.fecha_update=row.fecha_update;
  reporte.fecha_aprobacion = row.fecha_aprobacion??undefined;
  return reporte;
}