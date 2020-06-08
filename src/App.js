import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import { AuthContext } from './context/authContext';
import MainRouter from './MainRouter';

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
      <MainRouter />
    </ApolloProvider>
  );
};

export default App;
