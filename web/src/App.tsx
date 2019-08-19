import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router } from "react-router-dom";

import  Pages from "./pages"



// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();

const token = localStorage.getItem('token')

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql/',
    headers: {
      authorization: token ? `JWT ${token}` : "",
    },
  })
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn 
  }
`

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return <Pages />
  // return data.isLoggedIn ? <Pages /> : <Login />;
}


const App: React.FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
          <IsLoggedIn />
        </ApolloProvider>
    </Router>
  );
}

export default App;
