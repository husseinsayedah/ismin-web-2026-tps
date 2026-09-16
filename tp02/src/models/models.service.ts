import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelZoo } from './model-zoo.js';
import type { Model, Task } from './model.js';

@Injectable()
export class ModelsService {
  private readonly zoo = new ModelZoo();

  clear(): void {
    this.zoo.clear();
  }

  create(model: Model): void {
    this.zoo.addModel(model);
  }

  findAll(org?: string, task?: Task): Model[] {
    let models = this.zoo.getAllModels();

    if (org !== undefined) {
      models = models.filter((model) => model.org === org);
    }

    if (task !== undefined) {
      models = models.filter((model) => model.task === task);
    }

    return models;
  }

  findOne(id: string): Model {
    const model = this.zoo.getModel(id);

    if (model === undefined) {
      throw new NotFoundException();
    }

    return model;
  }

  remove(id: string): void {
    const deleted = this.zoo.removeModel(id);

    if (!deleted) {
      throw new NotFoundException();
    }
  }
}