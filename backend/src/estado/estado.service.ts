import { Injectable, NotFoundException } from '@nestjs/common';
import { EstadoRepository } from './estado.repository';
import { EstadoResponseDto } from './dto/estado-response.dto';

@Injectable()
export class EstadoService {
    constructor(private readonly estadoRepository: EstadoRepository) {}

    async obtener(id: string): Promise<EstadoResponseDto> {
        const estado = await this.estadoRepository.findById(id);
        if (!estado) throw new NotFoundException('error.');
        return new EstadoResponseDto(estado);
    }

    async listar(): Promise<EstadoResponseDto[]> {
        const estados = await this.estadoRepository.findAll();
        return estados.map((e) => new EstadoResponseDto(e));
    }
}