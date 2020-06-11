import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import { AuthContext } from './context/authContext';
import MainRouter from './MainRouter';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const App = () => {
  const {
    state: { user },
  } = React.useContext(AuthContext);

  //! WebSocket Link
  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
    options: {
      reconnect: true,
    },
  });

  //! Http Link
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });

  //! Authentication
  const authLink = setContext(() => ({
    headers: {
      authtoken: user ? user.token : '',
    },
  }));

  //! concat http and authtoken links
  const httpAuthLink = authLink.concat(httpLink);

  //! split between httpLink or wsLink
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpAuthLink
  );

  //! Apollo Client
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
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

// const client = new ApolloClient({
//   uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
//   request: (operation) => {
//     operation.setContext({
//       headers: {
//         authtoken: user ? user.token : '',
//       },
//     });
//   },
// });
