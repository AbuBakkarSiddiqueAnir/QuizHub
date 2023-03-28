import Layout from "../components/layout/WebsiteLayout";
import "../styles/globals.css";

import { AppProps } from "next/app";


const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <Layout >

      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
