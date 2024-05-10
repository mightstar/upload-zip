import { gql } from "@apollo/client";
import Storage from "some-storage";
import jwtDecode from "jwt-decode";

import { useAuthContext } from "context/auth";
import { ACCESS_TOKEN_KEY } from "context/constants";
import { DEFAULT_RESPONSE_NAME } from "graphql/constants";
import { DEFAULT_RESPONSE_FIELDS } from "graphql/fragments";
import { DefaultResponse } from "graphql/types";
import { AuthErrorsMessages, User } from "types/authContext";
import { ApiData } from "types/Terms";

import { useCustomMutation, UseMutationWrapper } from "../helpers";

const PREFIX = "signUp";

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation signUp($input: SignUpInput!) {
    ${DEFAULT_RESPONSE_NAME}: signUp(input: $input) {
    token
      ...DefaultResponseFields
    }
  }
`;

export type SignUpResponse = DefaultResponse & {
  token?: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  terms?: ApiData[];
  timezone?: string;
};

type UseSignUp = UseMutationWrapper<typeof PREFIX, SignUpResponse, SignUpInput>;

export const useSignUp: UseSignUp = (options) => {
  const { signUp } = useCustomMutation(PREFIX, MUTATION, options);
  const { setUser } = useAuthContext();

  const handleSignUp: typeof signUp.request = async (input) => {
    try {
      const response = await signUp.request(input);

      const { token } = response || {};

      if (!token) {
        throw new Error(AuthErrorsMessages.SIGN_UP_ERROR);
      }

      await Storage.setItem(ACCESS_TOKEN_KEY, token);
      const { user }: { user: User } = jwtDecode(token);

      setUser(user);

      return response;
    } catch (error) {
      console.warn(error);

      throw new Error(AuthErrorsMessages.LOGIN_ERROR);
    }
  };

  return {
    signUp: {
      ...signUp,
      request: handleSignUp,
    },
  };
};
