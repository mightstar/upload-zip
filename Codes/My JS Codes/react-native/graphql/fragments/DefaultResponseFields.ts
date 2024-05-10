import { gql } from '@apollo/client';

export const DEFAULT_RESPONSE_FIELDS = gql`
  fragment DefaultResponseFields on DefaultResponseInterface {
    status
    message
  }
`;
