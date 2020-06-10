import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({
  user: { username = '', images = [], about = '' } = {},
}) => (
  <div class='card' style={{ width: '18rem' }}>
    <img class='card-img-top' src={images[1].url} alt='Card image cap' />
    <div class='card-body'>
      <h5 class='card-title'>@{username}</h5>
      <p class='card-text'>{about}</p>
      <Link to={`/user/${username}`} class='btn btn-primary'>
        Visit Profile
      </Link>
    </div>
  </div>
);

export default UserCard;
