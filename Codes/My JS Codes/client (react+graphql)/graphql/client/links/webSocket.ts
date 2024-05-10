import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import Storage from "some-storage";
import { createClient } from "graphql-ws";

import config from "config";
import { ACCESS_TOKEN_COOKIE_KEY, ACCESS_TOKEN_KEY } from "context/constants";

export const webSocketLink = new GraphQLWsLink(
  createClient({
    url: `${config.env.WS_API_HOST}/graphql`,
    shouldRetry: () => true,
    connectionParams: async () => {
      const accessToken = await Storage.getItem(ACCESS_TOKEN_KEY);

      return {
        [ACCESS_TOKEN_COOKIE_KEY]: accessToken,
      };
    },
  })
);
