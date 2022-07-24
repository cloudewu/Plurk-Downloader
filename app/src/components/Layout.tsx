import { PropsWithChildren } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Navbar />
      <main>
        { children }
      </main>
      <Footer />
    </>
  );
}

export default Layout;
