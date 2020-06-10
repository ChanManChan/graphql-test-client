import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../context/authContext';

const Nav = () => {
  const history = useHistory();
  const {
    state: { user },
    dispatch,
  } = React.useContext(AuthContext);

  const logout = () => {
    auth.signOut();
    dispatch({ type: 'LOGGED_IN_USER', payload: null });
    history.push('/login');
  };

  const present = () => {
    const overlay = document.querySelector('.overlay');
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.add('active');
    overlay.classList.add('active');
  };

  return (
    <nav
      id='c_Navbar'
      className='navbar navbar-expand-lg navbar-light bg-light'
    >
      <button
        type='button'
        id='sidebarCollapse'
        className='btn btn-primary my-auto mr-2'
        onClick={present}
      >
        <i className='fas fa-align-left'></i>
      </button>
      <Link className='navbar-brand' to='/'>
        Home
      </Link>
      <Link className='nav-item' to='/users'>
        Users
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto mr-3'>
          {user ? (
            <>
              <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  {user.email.split('@')[0]}
                </Link>
              </li>
              <li className='nav-item'>
                <a
                  style={{ cursor: 'pointer' }}
                  className='nav-link'
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item active'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <form className='form-inline my-2 my-lg-0'>
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <button
            className='btn btn-outline-success my-2 my-sm-0'
            type='submit'
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
