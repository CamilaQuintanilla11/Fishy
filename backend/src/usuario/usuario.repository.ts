import { Inject, Injectable } from '@nestjs/common';

const COLUMNS = 'id, correo, nombre, contrasenaHash, rol_id, created_at';

@Injectable()
export class UsuarioRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) { }

    async findAll(): Promise<Usuario[]>{
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario ORDER BY createdAt DESC`
        );
        return rows.map(toEntity)
    }
}

function toEntity(row: any): Usuario {
    const usuario = new Usuario();
    usuario.id = row.id;
    usuario.nombre = row.nombre;
    usuario.correo = row.correo;
    usuario.contrasenaHash = row.contrasenaHash;
    usuario.tieneRol = row.tieneRol;
    usuario.fecha_creado = row.fecha_creado;
    return usuario;
}