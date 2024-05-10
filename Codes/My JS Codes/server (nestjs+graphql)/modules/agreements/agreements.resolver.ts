import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListArgsPipe } from 'pipes/list-args';
import { ParseOrPipe } from 'pipes/parse-or-args';
import { ListArgs } from 'types';

import { AgreementsService } from './agreements.service';
import { Agreements } from './models/agreements.model';

@Resolver()
export class AgreementsResolver {
  constructor(private readonly agreementService: AgreementsService) {}

  @Query('agreements')
  async findAll(
    @Args(new ListArgsPipe<Agreements>(), new ParseOrPipe<Agreements>())
    args: ListArgs<Agreements>,
  ): Promise<Agreements[]> {
    return this.agreementService.findAll(args);
  }
}
