import '../styles/global.css';
import type { AppProps } from 'next/app';

import Head from 'next/head';

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      { /* eslint-disable react/jsx-props-no-spreading */ }
      <Component {...pageProps} />
    </>
  );
}

export default App;
