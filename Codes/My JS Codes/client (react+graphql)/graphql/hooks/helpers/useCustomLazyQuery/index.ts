import { useEffect, useMemo } from 'react';

import { DocumentNode, LazyQueryHookOptions, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import _merge from 'lodash/merge';

import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';
import { capitalizeFirstLetter } from 'utils/textConverting';

import { CustomLazyQueryResult, PrefixedLazyQueryResult } from './types';

import { useAbortController } from '../hooks';

export const useCustomLazyQuery = <Prefix extends string, Response, Input>(
  prefix: Prefix,
  query: DocumentNode | TypedDocumentNode<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
  options?: LazyQueryHookOptions<GetGraphqlResponseType<Response>, GetGraphqlVariablesType<Input>>,
  executeQueryImmediately?: boolean,
) => {
  const { abort, reset } = useAbortController();

  const defaultOptions = {
    fetchPolicy: 'network-only',
  };
  const mergedOptions = useMemo(() => {
    return _merge(defaultOptions, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const [lazyQuery, { data, ...restQueryResult }] = useLazyQuery<
    GetGraphqlResponseType<Response>,
    GetGraphqlVariablesType<Input>
  >(query, mergedOptions);

  const handleLazyQuery = async (input?: Input): Promise<Response | undefined> => {
    try {
      const customQuerySignal = reset();

      const result = await lazyQuery({
        variables: { input },
        context: { customQuerySignal },
      });

      return result.data?.response;
    } catch (error) {}
  };

  useEffect(() => {
    if (executeQueryImmediately) {
      handleLazyQuery();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryResult: CustomLazyQueryResult<
    Response,
    Input,
    GetGraphqlResponseType<Response>,
    GetGraphqlVariablesType<Input>
  > = {
    abort,
    data: data?.response,
    request: handleLazyQuery,
    ...restQueryResult,
  };

  return {
    [`get${capitalizeFirstLetter(prefix)}`]: queryResult,
  } as PrefixedLazyQueryResult<Prefix, Response, Input>;
};

export * from './types';
