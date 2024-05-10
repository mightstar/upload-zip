import { ArgsType, Field } from '@nestjs/graphql';
import { Order, WhereOptions } from 'sequelize';

@ArgsType()
export class ListArgs<M> {
  @Field({ nullable: true })
  where?: WhereOptions<M>;

  @Field({ nullable: true })
  order?: Order;

  @Field({ nullable: true })
  offset?: number;

  @Field({ nullable: true })
  limit?: number;
}
