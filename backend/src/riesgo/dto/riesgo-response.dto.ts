import { Rol } from "../../rol/entities/rol.entity";

export class RiesgoResponseDto {
    id: string;
    nombre: string;

    constructor(riesgo: Rol) {
        this.id = riesgo.id;
        this.nombre = riesgo.nombre;
    }
}