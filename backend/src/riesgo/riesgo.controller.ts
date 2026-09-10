import { Controller, Get, Param } from '@nestjs/common';
import { RiesgoService } from './riesgo.service';


@Controller('riesgos')
export class RiesgoController {
    constructor(private readonly riesgoService: RiesgoService) {}

    @Get()
    listar() {
        return this.riesgoService.listar();
    }

    @Get(':id')
    obtener(@Param('id') id: string) {
        return this.riesgoService.obtener(id);
    }
}