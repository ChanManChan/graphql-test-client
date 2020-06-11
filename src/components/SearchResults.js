import React from 'react';
import { useParams } from 'react-router-dom';
import { SEARCH } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import PostCard from './PostCard';

const SearchResults = () => {
  const { query = '' } = useParams();
  const { data: { search = [] } = {}, loading } = useQuery(SEARCH, {
    variables: { query },
  });

  return (
    <div className='container pt-5'>
      <h1>Search results</h1>
      {loading ? (
        <div className='spinner' />
      ) : search.length === 0 ? (
        <h3>No results were found</h3>
      ) : (
        <div className='row'>
          {search.map((p, i) => (
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
      )}
    </div>
  );
};

export default SearchResults;
