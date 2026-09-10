import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
}from '@nestjs/common';
import{ ReporteService} from './reporte.service';
import { ReporteResponseDto} from './dto/reporte-response.dto';
import { CreateReporteDto} from './dto/create-reporte.dto';
import { UpdateReporteDto} from './dto/update-reporte.dto';

@Controller('reportes')
export class ReporteController{
  constructor(private readonly service: ReporteService) {}

  @Post()
  create(@Body() dto:CreateReporteDto):Promise<ReporteResponseDto> {
    const userId = 'c8bc4e70-4051-4339-b288-7c71b2ff52ee'; 
    return this.service.create(userId, dto);
  }

  @Get()
  findAll():Promise<ReporteResponseDto[]>{
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string): Promise<ReporteResponseDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() dto: UpdateReporteDto,
  ): Promise<ReporteResponseDto> {
    return this.service.update(id,dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string):Promise<void> {
    return this.service.remove(id);
  }
}