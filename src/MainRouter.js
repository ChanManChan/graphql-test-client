import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import PrivateRoute from './components/PrivateRoute';
import PasswordUpdate from './pages/auth/PasswordUpdate';

const MainRouter = () => (
  <div className='router'>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route
        exact
        path='/complete-registration'
        component={CompleteRegistration}
      />
      <PrivateRoute exact path='/password-update' component={PasswordUpdate} />
    </Switch>
  </div>
);

export default MainRouter;
