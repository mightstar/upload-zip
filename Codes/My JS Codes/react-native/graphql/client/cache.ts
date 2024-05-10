import { FieldMergeFunction, InMemoryCache } from '@apollo/client';

const merge: FieldMergeFunction = (existing = [], incoming, { args }) => {
  const start = args?.input?.offset ?? existing.length;

  return [...existing.slice(0, start), ...incoming];
};

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        groups: {
          keyArgs: false,
          merge,
        },
      },
    },
  },
});
