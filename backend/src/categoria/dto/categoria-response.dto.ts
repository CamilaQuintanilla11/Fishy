import { Categoria } from '../entities/categoria.entity';

export class CategoriaResponseDto {
    id: string;
    nombre: string;

    constructor(categoria: Categoria) {
        this.id = categoria.id;
        this.nombre = categoria.nombre;
    }
}