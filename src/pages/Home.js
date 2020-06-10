import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import { GET_ALL_POSTS } from '../graphql/queries';
import PostCard from '../components/PostCard';

const Home = () => {
  const { data: { allPosts = [] } = {} } = useQuery(GET_ALL_POSTS);
  // const [fetchPosts, { data: { allPosts: posts = [] } = {} }] = useLazyQuery(
  //   GET_ALL_POSTS
  // );
  // access context
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

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
      {JSON.stringify(state.user)}
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
