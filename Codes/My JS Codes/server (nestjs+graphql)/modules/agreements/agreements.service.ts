import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Create, Destroy, FindAll, FindByPk, FindOne, Update } from 'types';

import { Agreements } from './models/agreements.model';

@Injectable()
export class AgreementsService {
  constructor(@InjectModel(Agreements) private agreementsModel: typeof Agreements) {}

  findOne: FindOne<Agreements> = options => {
    return this.agreementsModel.findOne(options);
  };

  findByPk: FindByPk<Agreements> = options => {
    return this.agreementsModel.findByPk(options);
  };

  findAll: FindAll<Agreements> = options => {
    return this.agreementsModel.findAll(options);
  };

  create: Create<Agreements> = (data, options) => {
    return this.agreementsModel.create(data, options);
  };

  update: Update<Agreements> = (data, options) => {
    return this.agreementsModel.update(data, options);
  };

  destroy: Destroy<Agreements> = options => {
    return this.agreementsModel.destroy(options);
  };
}
