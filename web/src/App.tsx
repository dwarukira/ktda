import React from "react";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Highcharts from "highcharts";
import Pages from "./pages";

import HC_exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

HC_exporting(Highcharts);

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();

const token = localStorage.getItem("token");

const client = new ApolloClient({
  cache,
  uri: "http://localhost:8000/graphql/",
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return <Pages />;
  // return data.isLoggedIn ? <Pages /> : <Login />;
};

const App: React.FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <IsLoggedIn />
      </ApolloProvider>
    </Router>
  );
};

export default App;
