import { JwtPayload } from 'jwt-decode';

import { SetState } from 'types/common';

export enum AuthErrorsMessages {
  RESET_PASSWORD = 'Password was reset',
  MISSING_TOKEN = 'Missing token in response',
  INVALID_TOKEN = 'Invalid token',
  SIGN_IN_ERROR = 'Sign in error',
  DEFAULT_ERROR = 'Unexpected error',
}

export enum SignInFieldName {
  EMAIL = 'email',
  PASSWORD = 'password',
  REMEMBER_ME = 'rememberMe',
}

export enum SignUpUserFieldName {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM = 'confirm',
}

export type SignInFormData = {
  [SignInFieldName.EMAIL]: string;
  [SignInFieldName.PASSWORD]: string;
  [SignInFieldName.REMEMBER_ME]: boolean;
};

export type SignUpUserFormData = {
  [SignUpUserFieldName.NAME]: string;
  [SignUpUserFieldName.EMAIL]: string;
  [SignUpUserFieldName.PASSWORD]: string;
  [SignUpUserFieldName.CONFIRM]: string;
};

export type AuthData = {
  id: number;
  email: string;
  fullName: string;
};

export type TokenData = JwtPayload & {
  data: AuthData;
};

export type AuthContextValues = {
  token?: string;
  isAuthenticated: boolean;
  authData: AuthData;
  isDataCleared: boolean;
  authErrorMessage: AuthErrorsMessages | null;
  logout: () => Promise<void>;
  changeIsDataCleared: (flag: boolean) => Promise<void>;
  setAuthErrorMessage: SetState<AuthErrorsMessages>;
  setUserData: (token: string, rememberMe: boolean) => Promise<void>;
};
