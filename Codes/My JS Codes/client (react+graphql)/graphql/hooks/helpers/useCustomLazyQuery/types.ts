import { LazyQueryHookOptions, LazyQueryResult, OperationVariables } from '@apollo/client';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

import { AbortFunction } from '../hooks';

export type CustomLazyQueryResult<Response, Input, Data, Variables extends OperationVariables> = Omit<
  LazyQueryResult<Data, Variables>,
  'data'
> & {
  data?: Response;
  abort: AbortFunction;
  request: (input?: Input) => Promise<Response | undefined>;
};

export type PrefixedLazyQueryResult<
  Prefix extends string,
  Response,
  Input,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
> = Record<`get${Capitalize<Prefix>}`, CustomLazyQueryResult<Response, Input, Data, Variables>>;

export type UseLazyQueryWrapper<
  Prefix extends string,
  Response,
  Input = undefined,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
> = (
  options?: LazyQueryHookOptions<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
  executeQueryImmediately?: boolean,
) => PrefixedLazyQueryResult<Prefix, Response, Input, Data, Variables>;
