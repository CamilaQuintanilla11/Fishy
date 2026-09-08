import { Estado } from '../entities/estado.entity';

export class EstadoResponseDto {
    id: string;
    nombre: string;
    
    constructor(estado: Estado) {
        this.id = estado.id;
        this.nombre = estado.nombre;
    }
}