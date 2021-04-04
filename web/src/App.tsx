import React from "react";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Highcharts from "highcharts";
import Pages from "./pages";

import HC_exporting from "highcharts/modules/exporting";

HC_exporting(Highcharts);

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "https://ktdaapi.herokuapp.com",
});

const IsLoggedIn = () => {
  return <Pages />;
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
