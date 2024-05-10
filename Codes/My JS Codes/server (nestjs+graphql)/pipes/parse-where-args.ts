import { Injectable, PipeTransform } from '@nestjs/common';

import { parseWhere } from 'utils';

@Injectable()
export class ParseWhereArgsPipe<Model> implements PipeTransform {
  transform(args: any): ParseWhereArgsPipe<Model> {
    const where = { ...parseWhere(args.where) };

    return { ...args, where };
  }
}
