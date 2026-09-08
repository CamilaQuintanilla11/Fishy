import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { RolResponseDto } from './dto/rol-response.dto';

@Injectable()
export class RolService {
    constructor(private readonly rolRepository: RolRepository) {}

    async crear(dto: CreateRolDto): Promise<RolResponseDto> {
        const rolPorNombre = await this.rolRepository.findByNombre(dto.nombre);
        const rolPorGatename = await this.rolRepository.findByGatename(dto.gatename);

        if (rolPorNombre) throw new ConflictException('error.');
        if (rolPorGatename) throw new ConflictException('error.');

        const creado = await this.rolRepository.save(dto);
        return new RolResponseDto(creado);
    }

    async obtener(id: string): Promise<RolResponseDto> {
        const rol = await this.rolRepository.findById(id);
        if (!rol) throw new NotFoundException('error.');
        return new RolResponseDto(rol);
    }

    async listar(): Promise<RolResponseDto[]> {
        const rol = await this.rolRepository.findAll();
        return rol.map((r) => new RolResponseDto(r));

    }

    async actualizar(id: string, dto: UpdateRolDto): Promise<RolResponseDto> {
        await this.obtener(id);

        if (dto.nombre) {
            const existente = await this.rolRepository.findByNombre(dto.nombre);
            if (existente && existente.id !== id) throw new ConflictException('error.');
        }

        const actualizado = await this.rolRepository.update(id, dto);
        return new RolResponseDto(actualizado!);
    }

    async eliminar(id:string ): Promise<void> {
        await this.obtener(id);
        await this.rolRepository.delete(id);
    }
}