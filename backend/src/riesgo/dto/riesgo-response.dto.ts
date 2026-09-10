import { Riesgo } from "../entities/riesgo.entity";

export class RiesgoResponseDto {
    id: string;
    nombre: string;

    constructor(riesgo: Riesgo) {
        this.id = riesgo.id;
        this.nombre = riesgo.nombre;
    }
}