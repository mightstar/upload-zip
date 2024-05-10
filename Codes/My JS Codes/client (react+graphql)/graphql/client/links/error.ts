import { onError } from '@apollo/client/link/error';

import config from 'config';
import { authContextRef } from 'context/auth';
import { serverAvailabilityRef } from 'context/serverAvailability';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  const messages = graphQLErrors?.map(e => e.message);

  if (messages?.includes('Not authorized')) {
    authContextRef.current?.logout();

    return;
  }

  console.warn({
    API_HOST: config.env.API_HOST,
    graphQLErrors: JSON.stringify(graphQLErrors, null, 2),
    networkError: JSON.stringify(networkError, null, 2),
  });

  if (networkError) {
    serverAvailabilityRef.current?.updateServerAvailabilityStatus(false);
  }
});
