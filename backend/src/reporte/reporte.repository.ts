import { Inject, Injectable } from '@nestjs/common';
import {randomUUID} from 'node:crypto';
import type {Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import {DB_POOL} from '../database/database.module';
import {Reporte} from './entities/reporte.entity';

const COLUMNS='id, descripcion, nivel_riesgo, fecha_pub, fecha_update, fecha_aprob, perteneceA, tieneEstado';

@Injectable()
export class ReporteRepository {
  constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

  async findAll():Promise<Reporte[]> {
    const [rows]=await this.pool.query<RowDataPacket[]>(
      `SELECT ${COLUMNS} FROM reporte ORDER BY fecha_pub DESC`,
    );
    return rows.map(toEntity);
  }

  async findById(id: string):Promise<Reporte | undefined> {
    const [rows]=await this.pool.query<RowDataPacket[]>(
      `SELECT ${COLUMNS} FROM reporte WHERE id ='${id}'`,
    );
    return rows[0] && toEntity(rows[0]);
  }

  async findEstadoIdByNombre(nombre:string):Promise<string | undefined> {
    const [rows]=await this.pool.query<RowDataPacket[]>(
      `SELECT id FROM estado WHERE nombre ='${nombre}'`,
    );
    return rows[0]?.id;
  }

  async save (data:{descripcion: string; nivel_riesgo: string; perteneceA: string; tieneEstado: string;}): Promise<Reporte> {
    const id = randomUUID();
    await this.pool.query(
      `INSERT INTO reporte (id, descripcion, nivel_riesgo, perteneceA, tieneEstado)
       VALUES ('${id}', '${data.descripcion}', '${data.nivel_riesgo}', '${data.perteneceA}', '${data.tieneEstado}')`,
    );
    return (await this.findById(id))!;
  }

  async update(id: string, changes:Partial<Reporte>,): Promise<Reporte | undefined> {
    const sets = Object.entries(changes)
      .map(([column, value]) => `${column}='${value}'`)
      .join(', ');
    await this.pool.query(`UPDATE reporte SET ${sets} WHERE id ='${id}'`);
    return this.findById(id);
  }

  async delete(id: string):Promise<boolean> {
    const [result]=await this.pool.query<ResultSetHeader>
    (
      `DELETE FROM reporte WHERE id = '${id}'`,
    );
    return result.affectedRows>0;
  }
}

function toEntity(row: any): Reporte {
  const reporte=new Reporte();
  reporte.id = row.id;
  reporte.descripcion = row.descripcion;
  reporte.nivel_riesgo=row.nivel_riesgo;
  reporte.fecha_pub=row.fecha_pub;
  reporte.fecha_update= row.fecha_update;
  reporte.fecha_aprob= row.fecha_aprob ?? undefined;
  reporte.perteneceA =row.perteneceA;
  reporte.tieneEstado= row.tieneEstado;
  return reporte;
}