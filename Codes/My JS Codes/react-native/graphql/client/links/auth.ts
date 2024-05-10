import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_KEY } from 'constants/store';

export const authLink = setContext(async (_operation, previousContext) => {
  const { headers } = previousContext;
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      time: new Date(),
    },
  };
});
