import {
  Attributes,
  BulkCreateOptions,
  CountOptions,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindOptions,
  Identifier,
  Model,
  Transaction,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Col, Fn, Literal } from 'sequelize/types/utils';

export type GetIdsByExcludedOptions<M> = {
  ids: number[];
  isExclude: boolean;
  additionalWhere?: WhereOptions<M>;
};

export interface UpdateManyToManyOptions<Options extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * @param targetId searchable identifier
   */
  targetId: number;
  /**
   * @param targetIdAttribute searchable property name
   */
  targetIdAttribute: string;
  /**
   * @param processingIdAttribute processing property name
   */
  processingIdAttribute: string;
  /**
   * @param processingIds ID-s for processing
   */
  processingIds: number[];
  /**
   * @param transaction whether to use transaction
   */
  /**
   * @param options extra options
   */
  options?: Options;
  transaction?: Transaction;
}

export type FindByPk<M extends Model> = (
  identifier?: Identifier,
  options?: Omit<FindOptions<Attributes<M>>, 'where'>,
) => Promise<M | null>;

export type FindOne<M extends Model> = (options?: FindOptions<Attributes<M>>) => Promise<M>;

export type FindAll<M extends Model> = (options?: FindOptions<Attributes<M>>) => Promise<M[]>;

export type Count<M extends Model> = (options?: Omit<CountOptions<Attributes<M>>, 'group'>) => Promise<number>;

export type Create<M extends Model> = (
  data: CreationAttributes<M>,
  options?: CreateOptions<Attributes<M>>,
) => Promise<CreateOptions<Attributes<M>> extends { returning: false } | { ignoreDuplicates: true } ? void : M>;

export type BulkCreate<M extends Model> = (
  records: ReadonlyArray<CreationAttributes<M>>,
  options?: BulkCreateOptions<Attributes<M>>,
) => Promise<M[]>;

export type Update<M extends Model> = (
  values: {
    [key in keyof Attributes<M>]?: Attributes<M>[key] | Fn | Col | Literal;
  },
  options: UpdateOptions<Attributes<M>>,
) => Promise<[affectedCount: number, affectedRows?: M[]]>;

export type Destroy<M extends Model> = (options?: DestroyOptions<Attributes<M>>) => Promise<number>;

export type GetIdsByExcluded<M extends Model> = (options: GetIdsByExcludedOptions<M>) => Promise<number[]>;
