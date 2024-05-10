import { Injectable, PipeTransform } from '@nestjs/common';

import { DefaultArgs } from 'types';
import { parseOrOperator } from 'utils';

@Injectable()
export class ParseOrPipe<Model> implements PipeTransform {
  constructor(private readonly tableName?: string) {}

  transform(args: any): DefaultArgs<Model> {
    return { ...args, ...(args.where && { where: parseOrOperator(args.where, undefined, this.tableName) }) };
  }
}
