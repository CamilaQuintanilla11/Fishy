import { Usuario } from '../entities/usuario.entity';

export class UsuarioResponseDto {
    id: string;
    nombre: string;
    correo: string;
    rol: string;
    fecha_registro: Date;

    constructor(usuario: Usuario) {
        this.id = usuario.id;
        this.nombre = usuario.nombre;
        this.correo = usuario.correo;
        this.rol = usuario.rol;
        this.fecha_registro = usuario.fecha_registro;
    }
}