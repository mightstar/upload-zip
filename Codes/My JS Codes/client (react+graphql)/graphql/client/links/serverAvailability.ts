import { ApolloLink, FetchResult } from '@apollo/client';

import { serverAvailabilityRef } from 'context/serverAvailability';

export const serverAvailabilityLink = new ApolloLink((operation, forward) => {
  const linkResult = forward(operation);

  const updateServerAvailability = (response: FetchResult) => {
    const { errors } = response;

    if (!errors) {
      serverAvailabilityRef.current?.updateServerAvailabilityStatus(true);
    }
  };

  return linkResult.map(response => {
    updateServerAvailability(response);
    return response;
  });
});
