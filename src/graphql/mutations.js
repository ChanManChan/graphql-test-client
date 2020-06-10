import { USER_INFO, POST_DATA } from './fragments';
import { gql } from 'apollo-boost';

export const USER_UPDATE = gql`
  mutation UserUpdate($input: UserUpdateInput) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const POST_CREATE = gql`
  mutation PostCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const POST_DELETE = gql`
  mutation PostDelete($_id: ID!) {
    postDelete(postId: $_id) {
      _id
    }
  }
`;

export const POST_UPDATE = gql`
  mutation PostUpdate($input: PostUpdateInput!) {
    postUpdate(input: $input) {
      ...postData
    }
  }
  ${POST_DATA}
`;
