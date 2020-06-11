import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LoadingRedirect from './Loading&Redirect';

const PrivateRoute = (props) => {
  const { state } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(false);

  React.useEffect(() => {
    if (state.user) setUser(true);
  }, [state.user]);

  const vanish = () => {
    const overlay = document.querySelector('.overlay');
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  };

  const NavLinks = () => (
    <>
      <nav id='sidebar'>
        <div id='dismiss' onClick={vanish}>
          <i className='fas fa-arrow-left'></i>
        </div>
        <div className='sidebar-header'>
          <h4>Private routes</h4>
        </div>
        <ul className='list-unstyled components'>
          <p>Actions</p>
          <li>
            <a
              href='#profileSubmenu'
              data-toggle='collapse'
              aria-expanded='false'
              className='dropdown-toggle'
            >
              Profile Settings
            </a>
            <ul className='collapse list-unstyled' id='profileSubmenu'>
              <li>
                <Link to='/profile'>Edit Profile</Link>
              </li>
              <li>
                <Link to='/password/update'>Update Password</Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href='#postsSubmenu'
              data-toggle='collapse'
              aria-expanded='false'
              className='dropdown-toggle'
            >
              Posts
            </a>
            <ul className='collapse list-unstyled' id='postsSubmenu'>
              <li>
                <Link to='/posts/this_user'>Activity Log</Link>
              </li>
              <li>
                <Link to='/post/create'>Create Post</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='overlay' onClick={vanish} />
      <div id='content'>
        <div className='container p-5'>
          <Route {...props} />
        </div>
      </div>
    </>
  );

  return user ? <NavLinks /> : <LoadingRedirect path='/login' />;
};

export default PrivateRoute;
