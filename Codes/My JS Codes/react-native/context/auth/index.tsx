import { createContext, createRef, FC, useCallback, useEffect, useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { AnalyticsService } from '@modules/analytics-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decode from 'jwt-decode';

import { AUTH_TOKEN_KEY, IS_DATA_CLEARED_KEY } from 'constants/store';
import { useVerifyToken } from 'graphql/hooks/mutations/useVerifyToken';
import { DefaultResponseStatus } from 'graphql/types';

import {
  AuthContextValues,
  AuthData,
  AuthErrorsMessages,
  TokenData,
} from './types';

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const authContextRef = createRef<AuthContextValues>();

/**
 * Checks if the passed `message` is in form that defined in `AuthErrorsMessages` type
 * and returns appropriate value based on result of this check
 *
 * @param message message to check
 * @returns the message itself if it is in form that defined in `AuthErrorsMessages` type
 * or default auth error
 */
const getAuthError = (message?: string): AuthErrorsMessages => {
  const isErrorDefined = message && Object.values<string>(AuthErrorsMessages).includes(message);
  return isErrorDefined ? (message as AuthErrorsMessages) : AuthErrorsMessages.DEFAULT_ERROR;
};

export const AuthProvider: FC = ({ children }) => {
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const [isDataCleared, setIsDataCleared] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const apolloClient = useApolloClient();

  // We don't need to set null here, because we use the data only on the private screens when we are certain that we have them
  const [authData, setAuthData] = useState<AuthData>({} as AuthData);
  const [authErrorMessage, setAuthErrorMessage] = useState<AuthErrorsMessages | null>(null);

  const { verifyToken } = useVerifyToken();

  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const dataClearedFlag = await AsyncStorage.getItem(IS_DATA_CLEARED_KEY);

      if (dataClearedFlag) {
        setIsDataCleared(JSON.parse(dataClearedFlag));
      }

      if (storedToken) {
        const response = await verifyToken({ token: storedToken });

        if (response?.status === DefaultResponseStatus.SUCCESS) {
          setToken(storedToken);
        } else {
          await logout();

          const errorMessage = getAuthError(response?.message);

          setAuthErrorMessage(errorMessage);
        }
      }

      setTimeout(() => {
        setAuthLoaded(true);
      }, 200);
    })();
  }, []);

  const logout = async () => {
    await apolloClient.clearStore();
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    AnalyticsService.eventTracker.trackEvent({ businessEventName: 'userLoggedOut' });
    setAuthData({} as AuthData);
    setToken(null);
  };

  const changeIsDataCleared = useCallback(async (flag: boolean) => {
    setIsDataCleared(flag);
    await AsyncStorage.setItem(IS_DATA_CLEARED_KEY, String(flag));
  }, []);

  const setDecodedUser = (userToken: string) => {
    const { data } = decode<TokenData>(userToken);

    setAuthData(data);
    if (data?.id) {
      AnalyticsService.eventTracker.identifyUser(data.id.toString());
    }
  };

  useEffect(() => {
    if (token) {
      setDecodedUser(token);
    }
  }, [token]);

  const setUserData = async (token: string, rememberMe: boolean) => {
    if (rememberMe) {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    setToken(token);
    setDecodedUser(token);
  };

  if (!authLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={
        {
          token,
          authData,
          isAuthenticated: Boolean(token),
          isDataCleared,
          authErrorMessage,
          logout,
          changeIsDataCleared,
          setAuthErrorMessage,
          setUserData,
        } as AuthContextValues
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export * from './types';
