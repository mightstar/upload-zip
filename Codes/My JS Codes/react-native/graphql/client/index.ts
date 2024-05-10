import { ApolloClient, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { apolloCache } from './cache';
import { errorLink, httpLink, retryLink, webSocketLink } from './links';

// the order is important
const commonLink = from([retryLink, errorLink]);

const finalLink = commonLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  webSocketLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: finalLink,
  cache: apolloCache,
});
