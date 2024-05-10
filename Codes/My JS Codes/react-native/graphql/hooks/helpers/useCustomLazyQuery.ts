import { useEffect, useMemo, useRef } from 'react';

import {
  LazyQueryHookOptions,
  LazyQueryResultTuple,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client';
import { merge } from 'lodash';
import { AbortController } from 'native-abort-controller';

import { DocumentNode } from 'graphql/language/ast';
import { GetGraphqlResponseType, GetGraphqlVariablesType } from 'graphql/types';

import { CommonUseApolloHookWrapperResult } from './types';

type AbortFunction = () => void;

export type UseLazyQueryWrapper<
  Name extends string,
  Response,
  Input,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
  PrefixedName extends string = `get${Capitalize<Name>}`,
> = (
  options?: LazyQueryHookOptions<Data, Variables>,
  executeQueryImmediately?: boolean,
) => CommonUseApolloHookWrapperResult<PrefixedName, Response> &
  Record<PrefixedName, (input: Input) => void> &
  Record<`abort${Capitalize<PrefixedName>}`, AbortFunction>;

export type UseCustomLazyQuery = <
  Response,
  Input,
  Data = GetGraphqlResponseType<Response>,
  Variables extends OperationVariables = GetGraphqlVariablesType<Input>,
>(
  query: DocumentNode | TypedDocumentNode<Data, Variables>,
  options?: LazyQueryHookOptions<Data, Variables>,
  executeQueryImmediately?: boolean,
) => [...LazyQueryResultTuple<Data, Variables>, AbortFunction];

export const useCustomLazyQuery: UseCustomLazyQuery = (query, options, executeQueryImmediately = false) => {
  const aborterRef = useRef<AbortController>();

  const defaultOptions = {
    fetchPolicy: 'network-only',
  };
  const mergedOptions = useMemo(() => {
    return merge(defaultOptions, options);
  }, [options]);

  const [lazyQuery, queryInfo] = useLazyQuery(query, mergedOptions);

  const handledLazyQuery = async (localOptions?: unknown) => {
    try {
      aborterRef.current?.abort();
      aborterRef.current = new AbortController();

      const defaultLocalOptions = {
        context: {
          fetchOptions: {
            signal: aborterRef.current.signal,
          },
        },
      };
      const mergedLocalOptions = merge(defaultLocalOptions, localOptions);

      return await lazyQuery(mergedLocalOptions);
    } catch (error) {
      return queryInfo;
    }
  };

  const abort: AbortFunction = () => {
    aborterRef.current?.abort();
  };

  useEffect(() => {
    if (executeQueryImmediately) {
      handledLazyQuery();
    }

    return () => {
      abort();
    };
  }, []);

  return [handledLazyQuery, queryInfo, abort];
};
