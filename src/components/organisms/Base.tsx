import React from "react";
import { Header } from "@Components/molecules/Header";
import { Footer } from "@Components/molecules/Footer";
import { ScrollBarY } from "@Components/atoms/ScrollBar";
import { Background } from "@Components/atoms/Background";
import { SiteSiteMetadata } from "../../gatsby-graphql";

interface BaseProps {
  siteMetadata?: SiteSiteMetadata | null;
}

const Base: React.FC<BaseProps> = ({ siteMetadata, children }) => {
  return (
    <>
      <Background>
        <ScrollBarY />
        <div className="min-h-screen py-12 px-14">
          <div className="container">
            <Header title={siteMetadata?.title} />
            {children}
            <Footer
              twitterId={siteMetadata?.twitterId}
              copyright={siteMetadata?.copyright}
            />
          </div>
        </div>
      </Background>
    </>
  );
};

export default Base;
