import { useCallback } from 'react';

import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_FIELDS } from 'graphql/fragments';
import { DefaultResponse } from 'graphql/types';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

export interface CheckEmailExistenceResponse extends DefaultResponse {}

export interface CheckEmailExistenceInput {
  email: string;
}

type UseCheckEmailExistence = UseMutationWrapper<
  'checkEmailExistence',
  CheckEmailExistenceResponse,
  CheckEmailExistenceInput
>;

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation checkEmailExistence($input: CheckEmailExistenceInput!) {
    response: checkEmailExistence(input: $input) {
      ...DefaultResponseFields
    }
  }
`;

export const useCheckEmailExistence: UseCheckEmailExistence = options => {
  const [mutation, { data, loading, error }] = useCustomMutation<CheckEmailExistenceResponse, CheckEmailExistenceInput>(
    MUTATION,
    options,
  );

  const checkEmailExistence = useCallback(async (input: CheckEmailExistenceInput) => {
    const result = await mutation({ variables: { input } });

    return result.data?.response;
  }, []);

  return {
    checkEmailExistence,
    checkEmailExistenceResponse: data?.response,
    checkEmailExistenceLoading: loading,
    checkEmailExistenceError: error,
  };
};
