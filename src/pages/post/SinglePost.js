import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { SINGLE_POST } from '../../graphql/queries';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard';

const SinglePost = () => {
  const { postId } = useParams();

  const [
    getSinglePost,
    {
      data: {
        singlePost: {
          _id = '',
          content = '',
          image = {},
          createdAt = '',
          postedBy = {},
        } = {},
      } = {},
    },
  ] = useLazyQuery(SINGLE_POST);

  React.useEffect(() => {
    getSinglePost({ variables: { _id: postId } });
  }, []);

  return (
    <div className='container p-5'>
      <PostCard
        src={image.url}
        alt={image.public_id}
        postId={_id}
        username={postedBy.username}
        content={content}
        createdAt={createdAt}
      />
    </div>
  );
};

export default SinglePost;
