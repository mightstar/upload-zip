import { ArgsType, Field } from '@nestjs/graphql';
import { WhereOptions } from 'sequelize';

@ArgsType()
export class DefaultArgs<M> {
  @Field({ nullable: true })
  where?: WhereOptions<M>;
}
