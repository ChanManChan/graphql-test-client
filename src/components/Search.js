import React from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        className='form-control mr-sm-2'
        type='search'
        placeholder='Search'
        aria-label='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
        Search
      </button>
    </form>
  );
};

export default Search;
