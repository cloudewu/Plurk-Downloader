import * as React from 'react';

import Navbar from './Navbar';

function Layout(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Navbar />
      <main>
        { children }
      </main>
    </>
  );
}

export default Layout;
