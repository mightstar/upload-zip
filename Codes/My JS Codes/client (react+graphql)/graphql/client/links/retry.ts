import { RetryLink } from '@apollo/client/link/retry';

import {
  INITIAL_RETRY_TIMEOUT,
  MAX_AMOUNT_OF_RETRIES,
  MAX_RETRY_TIMEOUT,
  USE_JITTER_FOR_RETRY,
} from 'constants/apollo';
import { NETWORK_REQUEST_FAILED_TEXT } from 'graphql/constants';

export const retryLink = new RetryLink({
  attempts: {
    max: MAX_AMOUNT_OF_RETRIES,
    retryIf: error => {
      if (error.message.includes(NETWORK_REQUEST_FAILED_TEXT)) {
        return true;
      }

      return false;
    },
  },
  delay: { initial: INITIAL_RETRY_TIMEOUT, jitter: USE_JITTER_FOR_RETRY, max: MAX_RETRY_TIMEOUT },
});
