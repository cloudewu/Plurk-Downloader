import { PropsWithChildren } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

interface Props extends PropsWithChildren {
  title: string;
}

function Layout(props: Props) {
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>

      <Navbar />
      <main className="mx-6 md:mx-auto max-w-screen-md">
        { children }
      </main>
      <Footer />
    </>
  );
}

export default Layout;
