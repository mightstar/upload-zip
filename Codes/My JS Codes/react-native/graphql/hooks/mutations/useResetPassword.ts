import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_FIELDS } from 'graphql/fragments';
import { DefaultResponse } from 'graphql/types';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

export interface ResetPasswordResponse extends DefaultResponse {}

export interface ResetPasswordInput {
  email: string;
  code: string;
  newPassword: string;
}

type UseResetPassword = UseMutationWrapper<'resetPassword', ResetPasswordResponse, ResetPasswordInput>;

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation resetPassword($input: ResetPasswordInput!) {
    response: resetPassword(input: $input) {
      ...DefaultResponseFields
    }
  }
`;

export const useResetPassword: UseResetPassword = options => {
  const [mutation, { data, loading, error }] = useCustomMutation<ResetPasswordResponse, ResetPasswordInput>(
    MUTATION,
    options,
  );

  const resetPassword = async (input: ResetPasswordInput) => {
    const result = await mutation({ variables: { input } });

    return result.data?.response;
  };

  return {
    resetPassword,
    resetPasswordResponse: data?.response,
    resetPasswordLoading: loading,
    resetPasswordError: error,
  };
};
