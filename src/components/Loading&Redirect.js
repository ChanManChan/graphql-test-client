import React from 'react';
import { useHistory } from 'react-router-dom';

const LoadingRedirect = ({ path }) => {
  const [count, setCount] = React.useState(5);
  let history = useHistory();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((cs) => --cs);
    }, 1000);
    count === 0 && history.push(path);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className='redirect--container'>
      <div className='spinner' />
      <p className='redirect--msg'>Redirecting in {count} seconds...</p>
    </div>
  );
};

export default LoadingRedirect;
