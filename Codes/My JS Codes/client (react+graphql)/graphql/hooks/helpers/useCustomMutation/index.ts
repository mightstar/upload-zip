import { DocumentNode, MutationHookOptions, TypedDocumentNode, useMutation } from '@apollo/client';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

import { CustomMutationResult, PrefixedMutationResult } from './types';

export const useCustomMutation = <Prefix extends string, Response, Input>(
  prefix: Prefix,
  document: DocumentNode | TypedDocumentNode<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
  options?: MutationHookOptions<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
) => {
  const [mutation, { data, ...restMutationResult }] = useMutation<
    GetGraphqlResponseType<Response>,
    GetGraphqlVariablesType<Input>
  >(document, options);

  // we need this handler to avoid unhandled promises
  const handleMutation = async (input?: Input) => {
    try {
      const result = await mutation({ variables: { input } });

      // we do nothing with the error since we use the errorLink to handle this
      return result.data?.response;
    } catch {}
  };

  const mutationResult: CustomMutationResult<Response, Input, GetGraphqlResponseType<Response>> = {
    data: data?.response,
    request: handleMutation,
    ...restMutationResult,
  };

  return {
    [prefix]: mutationResult,
  } as PrefixedMutationResult<Prefix, Response, Input>;
};

export * from './types';
