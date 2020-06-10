import React from 'react';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';

const PostCard = ({
  i = 0,
  src,
  alt,
  postId = '',
  username,
  content,
  createdAt,
  updateAndDelete = false,
  handleDelete = (f) => f,
}) => {
  const history = useHistory();
  return (
    <div
      className='card m-2'
      style={{ minWidth: '18.75rem', maxWidth: '18.75rem' }}
      key={i}
    >
      <Link to={`/post/${postId}`}>
        <img className='card-img-top' src={src} alt={alt} />
      </Link>
      <div className='card-body'>
        <h5 className='card-title'>@{username}</h5>
        <p className='card-text'>{content}</p>
      </div>
      {updateAndDelete && (
        <>
          <button
            className='btn btn-danger'
            onClick={() => handleDelete(postId)}
          >
            Delete
          </button>
          <button
            className='btn btn-info'
            onClick={() => history.push(`/post/update/${postId}`)}
          >
            Edit
          </button>
        </>
      )}
      <div class='card-footer'>
        <small class='text-muted'>
          updated {moment.unix(createdAt / 1000).fromNow()}
        </small>
      </div>
    </div>
  );
};

export default PostCard;
