import { USER_INFO, POST_DATA } from './fragments';
import { gql } from 'apollo-boost';

export const PROFILE = gql`
  query {
    profile {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GET_ALL_POSTS = gql`
  {
    allPosts {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const ALL_USERS = gql`
  {
    allUsers {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const POSTS_BY_USER = gql`
  {
    postsByUser {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const SINGLE_POST = gql`
  query SinglePost($_id: ID!) {
    singlePost(postId: $_id) {
      ...postData
    }
  }
  ${POST_DATA}
`;
