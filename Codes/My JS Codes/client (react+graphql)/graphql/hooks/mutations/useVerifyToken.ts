import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from 'graphql/constants';
import { DEFAULT_RESPONSE_FIELDS } from 'graphql/fragments';
import { DefaultResponse } from 'graphql/types';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

const PREFIX = 'verifyToken';

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation verifyToken {
    ${DEFAULT_RESPONSE_NAME}: verifyToken {
      ...DefaultResponseFields
    }
  }
`;

export type VerifyTokenResponse = DefaultResponse;

export type VerifyTokenInput = never;

type UseVerifyToken = UseMutationWrapper<typeof PREFIX, VerifyTokenResponse, VerifyTokenInput>;

export const useVerifyToken: UseVerifyToken = options => {
  return useCustomMutation(PREFIX, MUTATION, options);
};
