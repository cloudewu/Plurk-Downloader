import Head from 'next/head';
import * as React from 'react';

import InputForm from '../components/home/InputForm';
import WelcomePanel from '../components/home/WelcomePanel';

function HomePage() {
  return (
    <>
      <Head>
        <title>首頁 - 噗文轉存器</title>
      </Head>

      <div className="mx-auto max-w-screen-md border border-red-500 px-6 py-20">
        <h1 className="text-lg font-bold">噗文轉存器</h1>
        <WelcomePanel className="my-8" />
        <InputForm />
      </div>
    </>
  );
}

export default HomePage;
