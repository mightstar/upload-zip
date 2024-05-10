import { from } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import config from 'config';

import { authLink } from './auth';
import { serverAvailabilityLink } from './serverAvailability';
import { timeoutLink } from './timeout';
import { trackingLink } from './tracking';

const uploadLink = createUploadLink({
  uri: `${config.env.API_HOST}/graphql`,
  // DEBUG Request
  // fetch: (...pl: any) => {
  //   const [_, options] = pl;
  //   console.log(options)
  //   return fetch(...pl);
  // },
});

//
export const httpLink = from([
  serverAvailabilityLink,
  timeoutLink,
  trackingLink,
  authLink,
  // @ts-expect-error Here is mismatch between apollo-upload-client's link type and @apollo/client's one
  uploadLink,
]);
