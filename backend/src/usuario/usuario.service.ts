import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcrypt') as typeof import('bcrypt');
import { UsuarioRepository } from './usuario.repository';
import { RolRepository } from '../rol/rol.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';

const ROL_DEFAULT = 'usuario';
@Injectable()
export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository, private readonly rolRepository: RolRepository) {}

    async crear(dto: CreateUsuarioDto): Promise<UsuarioResponseDto> {
        const yaExiste = await this.usuarioRepository.findByCorreo(dto.correo);
        if (yaExiste) throw new ConflictException('No se puede completar el registro.');

        let tieneRol = dto.tieneRol;
        if (!tieneRol) {
            const rolDefault = await this.rolRepository.findByNombre(ROL_DEFAULT);
            if (!rolDefault) {
                throw new Error('Error. revisar /seed.sql')
            }
            tieneRol = rolDefault.id;
        }
        const contrasenaHash = await bcrypt.hash(dto.contrasena, 10)
        const creado = await this.usuarioRepository.save({
            nombre: dto.nombre,
            correo: dto.correo,
            contrasenaHash,
            tieneRol,
        });
        return new UsuarioResponseDto(creado);
    }

    async obtener(id: string): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepository.findById(id);
        if (!usuario) throw new NotFoundException('error.');
        return new UsuarioResponseDto(usuario);
    }

    async listar(): Promise<UsuarioResponseDto[]> {
        const usuarios = await this.usuarioRepository.findAll();
        return usuarios.map((u) => new UsuarioResponseDto(u));

    }

    async actualizar(id: string, dto: UpdateUsuarioDto): Promise<UsuarioResponseDto> {
        await this.obtener(id);

        const cambios: Record<string, any> = {...dto};
        if (dto.contrasena) {
            cambios.contrasenaHash = await bcrypt.hash(dto.contrasena, 10);
            delete cambios.contrasena;
        }

        const actualizado = await this.usuarioRepository.update(id, cambios);
        return new UsuarioResponseDto(actualizado!);
    }

    async eliminar(id:string ): Promise<void> {
        await this.obtener(id);
        await this.usuarioRepository.delete(id);
    }
}