import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from 'config';
import { AUTH_TOKEN_KEY } from 'constants/store';
import { createClient } from 'graphql-ws';

export const webSocketLink = new GraphQLWsLink(
  createClient({
    url: `${config.env.WS_API_HOST}/graphql`,
    shouldRetry: () => true,
    connectionParams: async () => {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

      return { authorization: `Bearer ${token}` };
    },
  }),
);
