import { OperationVariables, QueryHookOptions, QueryResult } from '@apollo/client';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

import { AbortFunction } from '../hooks';

export type CustomQueryResult<Response, Data, Variables extends OperationVariables> = Omit<
  QueryResult<Data, Variables>,
  'data'
> & {
  abort: AbortFunction;
  data?: Response;
};

export type PrefixedQueryResult<Prefix extends string, Response, Data, Variables extends OperationVariables> = Record<
  `get${Capitalize<Prefix>}`,
  CustomQueryResult<Response, Data, Variables>
>;

export type UseQueryWrapper<
  Prefix extends string,
  Response,
  Input = undefined,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
> = (options?: QueryHookOptions<Data, Variables>) => PrefixedQueryResult<Prefix, Response, Data, Variables>;
