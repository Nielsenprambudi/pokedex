
import '../styles/globals.css';
import { Fragment } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery,gql } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store/store';
// import {jsx} from '@emotion/react';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Pokemon, Gotta Catch'em All</title>
        <meta
          name="description"
          content="Pokedex for data to hunt the pokemon"
        />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </Fragment>
  )
}

export default MyApp
