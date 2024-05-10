import ApolloLinkTimeout from 'apollo-link-timeout';

import { DEFAULT_REQUEST_TIMEOUT } from 'constants/apollo';

export const timeoutLink = new ApolloLinkTimeout(DEFAULT_REQUEST_TIMEOUT);
