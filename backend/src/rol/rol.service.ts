import { Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { RolResponseDto } from './dto/rol-response.dto';

@Injectable()
export class RolService {
    constructor(private readonly rolRepository: RolRepository) {}

    async crear(dto: CreateRolDto): Promise<UsuarioResponseDto> {
        const creado = await this.rolRepository.save(dto);
        return neew RolResponseDto(rol);
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

        const actualizado = await this.rolRepository.update(id, dto);
        return new RolResponseDto(actualizado!);
    }

    async eliminar(id:string ): Promise<void> {
        await this.obtener(id);
        await this.rolRepository.delete(id);
    }
}