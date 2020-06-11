import React from 'react';
import { useQuery, useSubscription, useLazyQuery } from '@apollo/react-hooks';
import { GET_ALL_POSTS, TOTAL_POSTS } from '../graphql/queries';
import PostCard from '../components/PostCard';
import PostPagination from '../components/PostPagination';
import {
  POST_ADDED,
  POST_UPDATED,
  POST_DELETED,
} from '../graphql/subscriptions';

const Home = () => {
  const [page, setPage] = React.useState(1);
  const { data: { allPosts = [] } = {} } = useQuery(GET_ALL_POSTS, {
    variables: { page },
  });

  const { data: postCount = {} } = useQuery(TOTAL_POSTS);

  const [fetchPosts] = useLazyQuery(GET_ALL_POSTS);

  const { data: newPost } = useSubscription(POST_ADDED, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
      try {
        const { allPosts } = cache.readQuery({
          query: GET_ALL_POSTS,
          variables: { page },
        });
        cache.writeQuery({
          query: GET_ALL_POSTS,
          variables: { page },
          data: {
            allPosts: [...allPosts, data.postAdded],
          },
        });
        fetchPosts({ variables: { page } });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const { data: updatedPost } = useSubscription(POST_UPDATED);

  const { data: deletedPost } = useSubscription(POST_DELETED, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
      try {
        const { allPosts } = cache.readQuery({
          query: GET_ALL_POSTS,
          variables: { page },
        });
        cache.writeQuery({
          query: GET_ALL_POSTS,
          variables: { page },
          data: {
            allPosts: allPosts.filter((p) => p._id !== data.postDeleted._id),
          },
        });
        fetchPosts({ variables: { page } });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const totalPages = Math.ceil(postCount.totalPosts / 3);

  return (
    <div className='container'>
      <div className='card-deck'>
        {allPosts.map((p, i) => (
          <PostCard
            i={i}
            src={p.image.url}
            alt={p.image.public_id}
            username={p.postedBy.username}
            content={p.content}
            createdAt={p.createdAt}
          />
        ))}
      </div>
      <PostPagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
