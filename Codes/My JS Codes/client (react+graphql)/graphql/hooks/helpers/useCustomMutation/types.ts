import { MutationHookOptions, MutationResult } from '@apollo/client';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

export type CustomMutationResult<Response, Input, Data> = Omit<MutationResult<Data>, 'data'> & {
  data?: Response;
  request: (input?: Input) => Promise<Response | undefined>;
};

export type PrefixedMutationResult<
  Prefix extends string,
  Response,
  Input = undefined,
  Data = GetGraphqlResponseType<Response>,
> = Record<Prefix, CustomMutationResult<Response, Input, Data>>;

export type UseMutationWrapper<
  Prefix extends string,
  Response,
  Input = undefined,
  Data = GetGraphqlResponseType<Response>,
  Variables = GetGraphqlVariablesType<Input>,
> = (options?: MutationHookOptions<Data, Variables>) => PrefixedMutationResult<Prefix, Response, Input, Data>;
