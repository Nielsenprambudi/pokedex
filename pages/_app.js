
import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css';
import { Fragment } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery,gql } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { CustomProvider } from 'rsuite';
// import {jsx} from '@emotion/react';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Fragment>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <CustomProvider theme='dark'>
            <Component {...pageProps} />
          </CustomProvider>
        </Provider>
      </ApolloProvider>
    </Fragment>
  )
}


export default MyApp;
