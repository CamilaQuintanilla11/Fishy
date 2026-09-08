import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Controller('estados')
export class EstadoController {
    constructor(private readonly estadoService: EstadoService) {}

    @Get()
    listar() {
        return this.estadoService.listar();
    }

    @Get(':id')
    obtener(@Param('id') id: string) {
        return this.estadoService.obtener(id);
    }

    @Post()
    crear(@Body() dto: CreateEstadoDto) {
        return this.estadoService.crear(dto);
    }

    @Patch(':id')
    actualizar(@Param('id') id: string, @Body() dto: UpdateEstadoDto) {
        return this.estadoService.actualizar(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    eliminar(@Param('id') id: string) {
        return this.estadoService.eliminar(id);
    }
}