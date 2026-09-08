import { Injectable, NotFoundException } from '@nestjs/common';
import { EstadoRepository } from './estado.repository';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { EstadoResponseDto } from './dto/estado-response.dto';

@Injectable()
export class EstadoService {
    constructor(private readonly estadoRepository: EstadoRepository) {}

    async crear(dto: CreateEstadoDto): Promise<EstadoResponseDto> {
        const creado = await this.estadoRepository.save(dto);
        return new EstadoResponseDto(creado);
    }

    async obtener(id: string): Promise<EstadoResponseDto> {
        const estado = await this.estadoRepository.findById(id);
        if (!estado) throw new NotFoundException('error.');
        return new EstadoResponseDto(estado);
    }

    async listar(): Promise<EstadoResponseDto[]> {
        const estados = await this.estadoRepository.findAll();
        return estados.map((e) => new EstadoResponseDto(e));
    }

    async actualizar(id: string, dto: UpdateEstadoDto): Promise<EstadoResponseDto> {
        await this.obtener(id);
        const actualizado = await this.estadoRepository.update(id, dto);
        return new EstadoResponseDto(actualizado!);
    }

    async eliminar(id: string): Promise<void> {
        await this.obtener(id);
        const eliminado = await this.estadoRepository.delete(id);
        if (!eliminado) throw new NotFoundException('error.');
    }
}