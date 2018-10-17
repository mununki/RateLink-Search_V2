import React, { Component } from "react";
import styled from "styled-components";
import Sticky from "react-stickynode";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
// import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloProvider } from "react-apollo";
import { API_URL, defaults, resolvers, GET_QUERYPARAMS } from "./resolver";
import { ApolloLink } from "apollo-link";
import { Query } from "react-apollo";

import Header from "./components/Header";
import Main from "./components/Main";

const httpLink = createUploadLink({
  uri: API_URL
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token@ratelink");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `JWT ${token}` : null
//     }
//   };
// });

const cache = new InMemoryCache();

const stateLink = withClientState({
  defaults,
  resolvers
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    // authLink,
    httpLink
  ])
});

const MarginTop = styled.div`
  width: 100%;
  height: 90px;
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MarginTop />
        <Sticky enabled={true} top={52} bottomBoundary={1200}>
          <Query query={GET_QUERYPARAMS}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return <span>Error :(</span>;

              return (
                <Header
                  USER_ID={this.props.USER_ID}
                  queryParams={data.queryParams}
                />
              );
            }}
          </Query>
        </Sticky>
        <Main USER_ID={this.props.USER_ID} />
      </ApolloProvider>
    );
  }
}

export default App;
