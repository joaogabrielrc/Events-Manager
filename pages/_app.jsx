import React from 'react';
import Head from 'next/head';

import Layout from '../client/components/layout/layout';
import '../client/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="description" content="NextJS Events" />
        <title>NextJS Events</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
