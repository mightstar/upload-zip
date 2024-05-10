import { MutationHookOptions, MutationTuple, TypedDocumentNode, useMutation } from '@apollo/client';

import { DocumentNode } from 'graphql/language/ast';
import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

import { CommonUseApolloHookWrapperResult } from './types';

export type UseMutationWrapper<
  Name extends string,
  Response,
  Input = undefined,
  Data = GetGraphqlResponseType<Response>,
  Variables = GetGraphqlVariablesType<Input>,
> = (
  options?: MutationHookOptions<Data, Variables>,
) => CommonUseApolloHookWrapperResult<Name, Response> &
  Record<
    Name,
    Input extends undefined
      ? (input?: Input) => Promise<Response | undefined>
      : (input: Input) => Promise<Response | undefined>
  >;

export type UseCustomMutation = <
  Response,
  Input,
  Data = GetGraphqlResponseType<Response>,
  Variables = GetGraphqlVariablesType<Input>,
>(
  query: DocumentNode | TypedDocumentNode<Data, Variables>,
  options?: MutationHookOptions<Data, Variables>,
) => MutationTuple<Data, Variables>;

export const useCustomMutation: UseCustomMutation = (...args) => {
  const [mutation, ...rest] = useMutation(...args);

  // we need this middleware to avoid unhandled promises
  const handledMutation = async (...mutationArgs: any[]) => {
    try {
      return await mutation(...mutationArgs);
    } catch (error) {
      // we do nothing with the error since we use the errorLink to handle this
      return {};
    }
  };

  return [handledMutation, ...rest];
};
