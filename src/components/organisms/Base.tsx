import React from "react";
import { Header } from "@Components/molecules/Header";
import { Footer } from "@Components/molecules/Footer";
import { SiteSiteMetadata } from "../../gatsby-graphql";

interface BaseProps {
  siteMetadata?: SiteSiteMetadata | null;
}

const Base: React.FC<BaseProps> = ({ siteMetadata, children }) => {
  console.log(siteMetadata);
  return (
    <div className="min-h-screen py-12 px-14 bg-white dark:bg-black transition duration-500 ease-in-out">
      <Header title={siteMetadata?.title} />
      <div className="container">{children}</div>
      <Footer
        twitterId={siteMetadata?.twitterId}
        copyright={siteMetadata?.copyright}
      />
    </div>
  );
};

export default Base;
