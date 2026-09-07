import { Usuario } from '../entities/usuario.entity';

export class UsuarioResponseDto {
    id: string;
    nombre: string;
    correo: string;
    tieneRol: string;
    fecha_creado: Date;

    constructor(usuario: Usuario) {
        this.id = usuario.id;
        this.nombre = usuario.nombre;
        this.correo = usuario.correo;
        this.tieneRol = usuario.tieneRol;
        this.fecha_creado = usuario.fecha_creado;
    }
}