import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ height: "100%" }}>
      <Head>{/* メタタグやフォントの設定など */}</Head>
      <body style={{ height: "100%" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
