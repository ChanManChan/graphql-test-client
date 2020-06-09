import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_USERS } from '../graphql/queries';
import UserCard from '../components/UserCard';

const Users = () => {
  const { data: { allUsers = [] } = {}, loading } = useQuery(ALL_USERS);

  return (
    <div className='container'>
      <div className='row p-5'>
        {loading ? (
          <div className='spinner' />
        ) : (
          allUsers.map((u, i) => (
            <div className='col-md-4' key={i}>
              <UserCard user={u} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
