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
          <h4>Bootstrap Sidebar</h4>
        </div>
        <ul className='list-unstyled components'>
          <p>Dummy Heading</p>
          <li>
            <a
              href='#homeSubmenu'
              data-toggle='collapse'
              aria-expanded='false'
              className='dropdown-toggle'
            >
              Home
            </a>
            <ul className='collapse list-unstyled' id='homeSubmenu'>
              <li>
                <a href='#'>Home 1</a>
              </li>
              <li>
                <a href='#'>Home 2</a>
              </li>
              <li>
                <a href='#'>Home 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
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
          </li>
          <li>
            <a href='#'>Portfolio</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
        </ul>
      </nav>
      <div className='overlay' onClick={vanish} />
      <div id='content'></div>
    </>
  );

  return user ? <NavLinks /> : <div className='spinner' />;
};

export default PrivateRoute;
