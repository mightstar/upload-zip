import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
  mutation createGroup($data: GroupCreate) {
    data: createGroup(data: $data) {
      id
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($data: GroupUpdate) {
    data: updateGroup(data: $data) {
      id
    }
  }
`;

export const REMOVE_GROUP = gql`
  mutation destroyGroup($id: Int!) {
    group: destroyGroup(id: $id)
  }
`;
