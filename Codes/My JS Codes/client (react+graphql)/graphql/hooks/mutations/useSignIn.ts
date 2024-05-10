import { gql } from "@apollo/client";
import Storage from "some-storage";
import jwtDecode from "jwt-decode";

import { useAuthContext } from "context/auth";
import { ACCESS_TOKEN_KEY, IS_REMEMBER_ME } from "context/constants";
import { DEFAULT_RESPONSE_NAME } from "graphql/constants";
import { DEFAULT_RESPONSE_FIELDS } from "graphql/fragments";
import { DefaultResponse, DefaultResponseStatus } from "graphql/types";
import { AuthErrorsMessages, User } from "types/authContext";

import { useCustomMutation, UseMutationWrapper } from "../helpers";

const PREFIX = "signIn";

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation signIn($input: SignInInput!) {
    ${DEFAULT_RESPONSE_NAME}: signIn(input: $input) {
      token
      ...DefaultResponseFields
    }
  }
`;

export type SignInResponse = DefaultResponse & {
  token?: string;
};

export type SignInInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type UseSignIn = UseMutationWrapper<typeof PREFIX, SignInResponse, SignInInput>;

export const useSignIn: UseSignIn = (options) => {
  const { signIn } = useCustomMutation(PREFIX, MUTATION, options);
  const { changeIsDataCleared, setUser, setIsLoggedInFromStoredToken } =
    useAuthContext();

  const handleSignIn: typeof signIn.request = async (input) => {
    try {
      const response = await signIn.request(input);

      const { status, message, token } = response || {};

      if (status === DefaultResponseStatus.ERROR) {
        throw new Error(message || AuthErrorsMessages.LOGIN_ERROR);
      }

      if (!token) {
        throw new Error(AuthErrorsMessages.LOGIN_ERROR);
      }

      await Storage.setItem(ACCESS_TOKEN_KEY, token);
      await Storage.setItem(IS_REMEMBER_ME, String(Boolean(input?.rememberMe)));

      const { user }: { user: User } = jwtDecode(token);

      setUser(user);
      changeIsDataCleared(false);
      setIsLoggedInFromStoredToken(false);
      return response;
    } catch (error) {
      console.warn(error);

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(AuthErrorsMessages.LOGIN_ERROR);
    }
  };

  return {
    signIn: {
      ...signIn,
      request: handleSignIn,
    },
  };
};
