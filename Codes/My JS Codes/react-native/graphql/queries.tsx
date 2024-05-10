import { gql } from '@apollo/client';

export const QUERY_FAQS = gql`
  query faqs {
    faqs {
      id
      title
      content
    }
  }
`;

export const GET_AGREEMENTS = gql`
  query agreements($input: GetManyInput!) {
    agreements(input: $input) {
      id
      name
      key
      content
    }
  }
`;

export const GET_GROUPS = gql`
  query groups($input: GetManyInput!) {
    list: groups(input: $input) {
      id
      name
      members {
        email
        name
        status
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query userProfile {
    profile: userProfile {
      fullName
      email
    }
  }
`;
