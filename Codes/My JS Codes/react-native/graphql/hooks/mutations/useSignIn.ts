import { useCallback } from 'react';

import { gql } from '@apollo/client';

import { AuthErrorsMessages } from 'context/auth/types';
import { DEFAULT_RESPONSE_FIELDS } from 'graphql/fragments';
import { DefaultResponse } from 'graphql/types';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

export interface SignInResponse extends DefaultResponse {
  token?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

type UseSignIn = UseMutationWrapper<'signIn', SignInResponse, SignInInput>;

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation signIn($input: SignInInput!) {
    response: signIn(input: $input) {
      token
      ...DefaultResponseFields
    }
  }
`;

export const useSignIn: UseSignIn = options => {
  const [mutation, { data, loading, error }] = useCustomMutation<SignInResponse, SignInInput>(MUTATION, options);

  const signIn = useCallback(
    async (input: SignInInput) => {
      const mutationResult = await mutation({ variables: { input } });

      const { response } = mutationResult.data || {};
      const { token } = response || {};

      if (!token) {
        throw new Error(AuthErrorsMessages.SIGN_IN_ERROR);
      }

      return response;
    },
    [mutation],
  );

  return { signIn, signInResponse: data?.response, signInLoading: loading, signInError: error };
};
