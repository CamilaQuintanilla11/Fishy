import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { CategoriaRepository } from './categoria.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CategoriaController],
    providers: [CategoriaService, CategoriaRepository],
    exports: [CategoriaRepository],
})
export class CategoriaModule {}