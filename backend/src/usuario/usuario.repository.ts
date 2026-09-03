import { Inject, Injectable } from '@nestjs/common';

const COLUMNS = 'id, correo, nombre, contrasenaHash, rol_id, created_at';

@Injectable()
export class UsuarioRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) { }

}