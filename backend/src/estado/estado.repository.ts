import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DB_POOL } from '../database/database.module';
import { Estado } from './entities/estado.entity';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

const COLUMNS = 'id, nombre';

@Injectable()
export class EstadoRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<Estado[]>{
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM estado ORDER BY nombre`,    
        );
        return rows.map(toEntity);
    }

    async findById(id: string): Promise<Estado | undefined> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM estado WHERE id = ?`,
            [id],
        );
        return rows[0] && toEntity(rows[0]);
    }

    async findByNombre(nombre: string): Promise<Estado | undefined> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM estado WHERE nombre = ?`,
            [nombre],           
        );
        return rows[0] && toEntity(rows[0]);
    }

    async save(estado: Omit<Estado, 'id'>): Promise<Estado> {
        const id = randomUUID();
        await this.pool.query(
           `INSERT INTO estado (id, nombre) VALUES (?, ?)`,
            [id, estado.nombre],
        );
        return (await this.findById(id))!;
    }

    async update(id: string, changes: Partial<Estado>): Promise<Estado | undefined> {
        const allowedColumns = ['nombre'];
        const entries = Object.entries(changes).filter(([column, value]) => allowedColumns.includes(column) && value !== undefined);
        if (entries.length === 0) return this.findById(id);

        const sets = entries.map(([column]) => `${column} = ?`).join(', ');
        const values = entries.map(([, value]) => value);

        await this.pool.query(`UPDATE estado SET ${sets} WHERE id = ?`, [...values, id]);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const [result] = await this.pool.query<ResultSetHeader>(
            `DELETE FROM estado WHERE id = ?`,
            [id],
        );
        return result.affectedRows > 0;
    }
}

function toEntity(row: any): Estado {
    const estado = new Estado();
    estado.id = row.id;
    estado.nombre = row.nombre;
    return estado;
}