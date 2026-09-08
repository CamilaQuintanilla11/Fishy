import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaRepository } from './categoria.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaResponseDto } from './dto/categoria-response.dto';

@Injectable()
export class CategoriaService {
    constructor(private readonly categoriaRepository: CategoriaRepository) {}

    async crear(dto: CreateCategoriaDto): Promise<CategoriaResponseDto> {
        const existente = await this.categoriaRepository.findByNombre(dto.nombre);
        if (existente) throw new ConflictException('la categoría ya existe.');

        const creado = await this.categoriaRepository.save(dto);
        return new CategoriaResponseDto(creado);
    }

    async obtener(id:string): Promise<CategoriaResponseDto> {
        const categoria = await this.categoriaRepository.findById(id);
        if (!categoria) throw new NotFoundException('error.');
        return new CategoriaResponseDto(categoria);
    }

    async listar(): Promise<CategoriaResponseDto[]>{
        const categorias = await this.categoriaRepository.findAll();
        return categorias.map((c) => new CategoriaResponseDto(c));
    }

    async actualizar(id: string, dto: UpdateCategoriaDto): Promise<CategoriaResponseDto> {
        await this.obtener(id);
        if (dto.nombre) {
            const existente = await this.categoriaRepository.findByNombre(dto.nombre);
            if (existente && existente.id !== id) throw new ConflictException('la categoría ya existe.');
        }
        const actualizado = await this.categoriaRepository.update(id, dto);
        return new CategoriaResponseDto(actualizado!);
    }

    async eliminar(id:string): Promise<void> {
        await this.obtener(id);
        const eliminado = await this.categoriaRepository.delete(id);
        if (!eliminado) throw new NotFoundException('error.');
    }
}