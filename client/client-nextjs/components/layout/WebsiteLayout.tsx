import Head from "next/head";
import { ReactNode } from "react";
import MetaTag from "../seo/MetaTag"

import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const Layout = ({ children }:{children:ReactNode}) => {
  return (
    <>
      <Head>
        <title>QuizzHub</title>
        <MetaTag />
        <link rel="icon" href="/logo/logo.png" />
      </Head>
      <Navbar/>
      {children}
      <Footer />
    </>
  );
};
export default Layout;
