import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ children, ...rest }) => {
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
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/password/update'>Update Password</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to='/post/create'>Post</Link>
          </li>
        </ul>
      </nav>
      <div className='overlay' onClick={vanish} />
      <div id='content'>
        <div className='container p-5'>
          <Route {...rest} />
        </div>
      </div>
    </>
  );

  return user ? <NavLinks /> : <div className='spinner' />;
};

export default PrivateRoute;
{
  /* <li>
<a
  href='#pageSubmenu'
  data-toggle='collapse'
  aria-expanded='false'
  className='dropdown-toggle'
>
  Pages
</a>
<ul className='collapse list-unstyled' id='pageSubmenu'>
  <li>
    <a href='#'>Page 1</a>
  </li>
  <li>
    <a href='#'>Page 2</a>
  </li>
  <li>
    <a href='#'>Page 3</a>
  </li>
</ul>
</li> */
}
{
  /* <li>
<a href='#'>Portfolio</a>
</li>
<li>
<a href='#'>Contact</a>
</li> */
}
