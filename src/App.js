import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import PasswordUpdate from './pages/auth/PasswordUpdate';

const App = () => {
  const {
    state: { user },
  } = React.useContext(AuthContext);

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : '',
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route
          exact
          path='/complete-registration'
          component={CompleteRegistration}
        />
        <PrivateRoute
          exact
          path='/password-update'
          component={PasswordUpdate}
        />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
