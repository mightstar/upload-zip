import { Optional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, IsAlphanumeric, PrimaryKey, Table } from 'sequelize-typescript';

import { DefaultModel } from 'modules/common/models/default.model';

export interface AgreementsAttributes {
  id: number;
  type: string;
  active: boolean;
  name: string;
  key: string;
  version: string;
  content: string;
}

export type CreateAgreementsAttributes = Optional<AgreementsAttributes, 'id'>;

@Table
export class Agreements extends DefaultModel<AgreementsAttributes, CreateAgreementsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @IsAlphanumeric
  @AllowNull(false)
  @Column
  type: string;

  @AllowNull(false)
  @Column
  active: boolean;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  key: string;

  @AllowNull(false)
  @Column
  version: string;

  @AllowNull(false)
  @Column
  content: string;
}
