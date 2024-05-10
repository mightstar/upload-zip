import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AgreementsResolver } from './agreements.resolver';
import { AgreementsService } from './agreements.service';
import { Agreements } from './models/agreements.model';

@Module({
  imports: [SequelizeModule.forFeature([Agreements])],
  providers: [AgreementsService, AgreementsResolver],
  exports: [AgreementsService],
})
export class AgreementsModule {}
