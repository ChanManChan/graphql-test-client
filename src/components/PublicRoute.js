import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = (props) => {
  const {
    state: { user },
  } = React.useContext(AuthContext);

  const history = useHistory();

  React.useEffect(() => {
    if (user) history.push('/profile');
  }, [user]);

  return (
    <div className='container-fluid p-5'>
      <Route {...props} />
    </div>
  );
};

export default PublicRoute;
