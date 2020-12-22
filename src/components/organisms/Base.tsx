import React from "react";
import { Header } from "@Components/molecules/Header";
import { Footer } from "@Components/molecules/Footer";
import { ScrollBarY } from "@Components/atoms/ScrollBar";
import { SiteSiteMetadata } from "../../gatsby-graphql";

interface BaseProps {
  siteMetadata?: SiteSiteMetadata | null;
}

const Base: React.FC<BaseProps> = ({ siteMetadata, children }) => {
  console.log(siteMetadata);
  return (
    <div className="min-h-screen py-12 px-14 bg-white dark:bg-black transition duration-500 ease-in-out">
      <div className="container">
        <ScrollBarY />
        <Header title={siteMetadata?.title} />
        {children}
        <Footer
          twitterId={siteMetadata?.twitterId}
          copyright={siteMetadata?.copyright}
        />
      </div>
    </div>
  );
};

export default Base;
