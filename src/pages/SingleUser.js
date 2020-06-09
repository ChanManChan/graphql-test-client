import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';

const PUBLIC_PROFILE = gql`
  query PublicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      username
      name
      email
      images {
        url
      }
      about
    }
  }
`;

const SingleUser = () => {
  let params = useParams();
  const { data: { publicProfile = {} } = {}, loading } = useQuery(
    PUBLIC_PROFILE,
    {
      variables: { username: params.username },
    }
  );

  return loading ? (
    <div className='spinner' />
  ) : (
    <div className='container'>
      <UserCard user={publicProfile} />
    </div>
  );
};

export default SingleUser;
