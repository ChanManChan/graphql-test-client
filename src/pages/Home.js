import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data: { allPosts = [] } = {} } = useQuery(GET_ALL_POSTS);
  const [fetchPosts, { data: { allPosts: posts = [] } = {} }] = useLazyQuery(
    GET_ALL_POSTS
  );
  return (
    <div className='container'>
      <div className='row p-5'>
        {posts.map((p, i) => (
          <div className='col-md-4' key={i}>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title'>
                  <h4>{p.title}</h4>
                </div>
                <p className='card-text'>{p.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className='row p-5'>
        <button
          className='btn btn-raised btn-primary'
          onClick={() => fetchPosts()}
        >
          Fetch Posts
        </button>
      </div>
    </div>
  );
};

export default Home;
