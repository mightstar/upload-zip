import { onError } from '@apollo/client/link/error';

import { authContextRef } from 'context/auth';
import { serverAvailabilityRef } from 'context/serverAvailability';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  const messages = graphQLErrors?.map(e => e.message);

  if (messages?.includes('Unauthorized')) {
    authContextRef.current?.logout();

    return;
  }

  console.log('HIT AN ERROR');
  console.log({
    graphQLErrors: JSON.stringify(graphQLErrors, null, 2),
    networkError: JSON.stringify(networkError, null, 2),
  });

  if (networkError) {
    serverAvailabilityRef.current?.updateServerAvailabilityStatus(false);
  }
});
