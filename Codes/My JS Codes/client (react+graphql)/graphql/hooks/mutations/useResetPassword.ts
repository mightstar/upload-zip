import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from 'graphql/constants';
import { DEFAULT_RESPONSE_FIELDS } from 'graphql/fragments';
import { DefaultResponse } from 'graphql/types';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

const PREFIX = 'resetPassword';

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation resetPassword($input: ResetPasswordInput!) {
    ${DEFAULT_RESPONSE_NAME}: resetPassword (input:$input) {
      ...DefaultResponseFields
    }
  }
`;

export type ResetPasswordResponse = DefaultResponse;

export type ResetPasswordInput = { email: string };

type UseResetPassword = UseMutationWrapper<typeof PREFIX, ResetPasswordResponse, ResetPasswordInput>;

export const useResetPassword: UseResetPassword = options => {
  return useCustomMutation(PREFIX, MUTATION, options);
};
