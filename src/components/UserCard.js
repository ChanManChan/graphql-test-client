import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';

const UserCard = ({
  user: { username = '', images = [], about = '' } = {},
}) => (
  <div className='card text-center' style={{ minHeight: '375px' }}>
    <div className='card-body'>
      <Image img={images[1]} />
      <Link to={`/user/${username}`}>
        <h4 className='text-primary'>@{username}</h4>
      </Link>
      <hr />
      <small>{about}</small>
    </div>
  </div>
);

export default UserCard;
