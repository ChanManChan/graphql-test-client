import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Post from './pages/post/Post';
import Profile from './pages/auth/Profile';

const MainRouter = () => (
  <div className='router'>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/users' component={Users} />
      <Route exact path='/user/:username' component={SingleUser} />
      <PublicRoute exact path='/register' component={Register} />
      <PublicRoute exact path='/login' component={Login} />
      <Route
        exact
        path='/complete-registration'
        component={CompleteRegistration}
      />
      <Route exact path='/password/forgot' component={PasswordForgot} />
      <PrivateRoute exact path='/password/update' component={PasswordUpdate} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute exact path='/post/create' component={Post} />
    </Switch>
  </div>
);

export default MainRouter;
