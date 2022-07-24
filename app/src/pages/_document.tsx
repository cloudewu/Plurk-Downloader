import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

function Document() {
  return (
    <Html lang="zh-TW">
      <Head>
        <meta name="description" content="Plurk Extractor" />
        <link rel="shortcut icon" href="/img/favicon.ico" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
