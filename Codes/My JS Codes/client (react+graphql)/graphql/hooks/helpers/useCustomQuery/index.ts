import { DocumentNode, QueryHookOptions, TypedDocumentNode, useQuery } from '@apollo/client';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';
import { capitalizeFirstLetter } from 'utils/textConverting';

import { CustomQueryResult, PrefixedQueryResult } from './types';

import { useAbortController } from '../hooks';

export const useCustomQuery = <Prefix extends string, Response, Input>(
  prefix: Prefix,
  document: DocumentNode | TypedDocumentNode<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
  options?: QueryHookOptions<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
) => {
  const { abort, getSignal } = useAbortController();
  const { data, ...restQueryResult } = useQuery<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>(
    document,
    {
      ...options,
      context: { customQuerySignal: getSignal() },
    },
  );

  const queryResult: CustomQueryResult<Response, GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>> = {
    abort,
    data: data?.response,
    ...restQueryResult,
  };

  return {
    [`get${capitalizeFirstLetter(prefix)}`]: queryResult,
  } as PrefixedQueryResult<Prefix, Response, GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>;
};

export * from './types';
