import React from 'react';
import { POSTS_BY_USER } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PostCard from '../../components/PostCard';
import { POST_DELETE } from '../../graphql/mutations';
import { toast } from 'react-toastify';

const UserPosts = () => {
  const [loading, setLoading] = React.useState(false);
  const { data: { postsByUser = [] } = {} } = useQuery(POSTS_BY_USER);

  const [postDelete] = useMutation(POST_DELETE, {
    onCompleted: () =>
      toast.error('Post removed', { position: toast.POSITION.BOTTOM_LEFT }),
    onError: () =>
      toast.error('Post delete failed', {
        position: toast.POSITION.BOTTOM_LEFT,
      }),
  });

  const handleDelete = async (postId) => {
    if (window.confirm('Delete this post?')) {
      setLoading(true);
      await postDelete({
        variables: { _id: postId },
        refetchQueries: [{ query: POSTS_BY_USER }],
      });
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <div className='spinner' /> : <h4>Recent Activity</h4>}
      <div className='card-deck'>
        {postsByUser.map((p, i) => (
          <PostCard
            i={i}
            postId={p._id}
            src={p.image.url}
            alt={p.image.public_id}
            username={p.postedBy.username}
            content={p.content}
            createdAt={p.createdAt}
            handleDelete={handleDelete}
            updateAndDelete
          />
        ))}
      </div>
    </>
  );
};

export default UserPosts;
