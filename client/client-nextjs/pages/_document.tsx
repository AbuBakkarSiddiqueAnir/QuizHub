import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

const MyDocument: React.FC = () => {
  return (
    <Html>
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Render the app and collect the styles using Material UI's ServerStyleSheets
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  // Return the initial props along with the Material UI styles
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;