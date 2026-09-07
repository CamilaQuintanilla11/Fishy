import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('roles')
export class RolController {
    constructor (private readonly rolService: RolService) {}

    @Get()
    listar() {
        return this.rolService.listar();
    }

    @Get(':id')
    obtener(@Param('id') id: string) {
        return this.rolService.obtener(id)
    }

    @Post()
    crear(@Body() dto: CreateRolDto) {
        return this.rolService.crear(dto);
    }

    @Patch(':id')
    actualizar(@Param('id') id:string, @Body() dto: UpdateRolDto){
        return this.rolService.actualizar(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    eliminar(@Param('id') id:string) {
        return this.rolService.eliminar(id);
    }
}