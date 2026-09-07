import { Rol } from '../entities/rol.entity';

export class RolResponseDto {
    id: string;
    nombre: string;
    gatename: string;

    constructor(rol: Rol) {
        this.id = rol.id;
        this.nombre = rol.nombre;
        this.gatename = rol.gatename;
    }
}