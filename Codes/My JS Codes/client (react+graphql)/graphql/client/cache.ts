import { InMemoryCache } from '@apollo/client';

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        entity1: {
          merge: false,
        },
        entity2: {
          merge: false,
        },
        entity3: {
          merge: false,
        },
      },
    },
  },
});
