import { Injectable, NotFoundException } from '@nestjs/common';
import { ReporteRepository } from './reporte.repository';
import { ReporteResponseDto } from './dto/reporte-response.dto';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

const ESTADO_INICIAL='pendiente';

@Injectable()
export class ReporteService {
  constructor(private readonly repository: ReporteRepository) {}

  async create(dto: CreateReporteDto): Promise<ReporteResponseDto> {
    const estadoId=await this.repository.findEstadoIdByNombre(ESTADO_INICIAL);
    if (!estadoId) {
      throw new Error(`No existe el estado "${ESTADO_INICIAL}" en el catálogo`);
    }
    const reporte=await this.repository.save({
      descripcion:dto.descripcion,
      nivel_riesgo:dto.nivel_riesgo,
      perteneceA: dto.perteneceA,
      tieneEstado: estadoId,
    });
    return ReporteResponseDto.fromEntity(reporte);
  }

  async findAll(): Promise<ReporteResponseDto[]> {
    const reportes=await this.repository.findAll();
    return reportes.map(ReporteResponseDto.fromEntity);
  }
  async findOne(id:string):Promise<ReporteResponseDto> {
    const reporte=await this.repository.findById(id);
    if (!reporte) {
      throw new NotFoundException(`Reporte ${id} no encontrado`);
    }
    return ReporteResponseDto.fromEntity(reporte);
  }
  async update(id:string, changes:UpdateReporteDto):Promise<ReporteResponseDto> {
    const reporte=await this.repository.findById(id);
    if (!reporte){
      throw new NotFoundException(`Reporte ${id} no encontrado`);
    }
    const updated=(await this.repository.update(id, changes))!;
    return ReporteResponseDto.fromEntity(updated);
  }
  async remove(id: string): Promise<void>{
    const reporte = await this.repository.findById(id);
    if (!reporte) {
      throw new NotFoundException(`Reporte ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}