import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { ModelsService } from './models.service.js';
import { CreateModelDto } from './dto/create-model.dto.js';
import type { Task } from './model.js';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  findAll(
    @Query('org') org?: string,
    @Query('task') task?: Task,
  ) {
    return this.modelsService.findAll(org, task);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelsService.findOne(id);
  }

  @Post()
  create(@Body() model: CreateModelDto) {
    this.modelsService.create(model);
    return model;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.modelsService.remove(id);
  }
}