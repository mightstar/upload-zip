import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

import { CommonUseApolloHookWrapperResult } from './types';

export type UseQueryWrapper<
  Name extends string,
  Response,
  Input,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
> = (
  options?: QueryHookOptions<Data, Variables>,
) => CommonUseApolloHookWrapperResult<Name, Response> & Record<`${Name}Refetch`, (input: Input) => void>;

export type UseCustomQuery = <
  Response,
  Input,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
>(
  query: DocumentNode | TypedDocumentNode<Data, Variables>,
  options?: QueryHookOptions<Data, Variables>,
) => QueryResult<Data, Variables>;

export const useCustomQuery: UseCustomQuery = (...args) => useQuery(...args);
