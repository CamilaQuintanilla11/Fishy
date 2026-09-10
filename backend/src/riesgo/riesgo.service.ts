import { Injectable, NotFoundException } from '@nestjs/common';
import { RiesgoRepository } from './riesgo.repository';
import { RiesgoResponseDto } from './dto/riesgo-response.dto';

@Injectable()
export class RiesgoService {
    constructor(private readonly riesgoRepository: RiesgoRepository) {}

    async obtener(id: string): Promise<RiesgoResponseDto> {
        const riesgo = await this.riesgoRepository.findById(id);
        if (!riesgo) throw new NotFoundException('error.');
        return new RiesgoResponseDto(riesgo);
    }

    async listar(): Promise<RiesgoResponseDto[]> {
        const riesgos = await this.riesgoRepository.findAll();
        return riesgos.map((r) => new RiesgoResponseDto(r));
    }
}