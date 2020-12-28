import { Link } from "gatsby";
import React from "react";
import { H1 } from "@Components/atoms/Typography";
import { Toggle } from "@Components/atoms/Toggle";
import { SiteSiteMetadata } from "../../../gatsby-graphql";
import TwitterIcon from "@Assets/Icon/twitter.svg";
import RssIcon from "@Assets/Icon/rss.svg";
import GitHubIcon from "@Assets/Icon/github.svg";

interface HeaderProps {
  siteMetadata?: SiteSiteMetadata | null;
}

const Header: React.FC<HeaderProps> = ({ siteMetadata }) => {
  const title = siteMetadata?.title;
  const twitterId = siteMetadata?.twitterId;
  const twitterURL = `https://twitter.com/${twitterId}`;
  const githubId = siteMetadata?.githubId;
  const githubURL = `https://github.com/${githubId}`;
  const handleOnChange = (v: boolean) => {
    if (v) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  };
  return (
    <header>
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <H1>{title}</H1>
        </Link>
        <div className="w-12 mr-2">
          <Toggle onChange={handleOnChange}></Toggle>
        </div>
        {twitterId && (
          <a
            href={twitterURL}
            target="_blank"
            rel="noreferrer"
            className="w-8 mr-2"
          >
            <TwitterIcon className="fill-current" />
          </a>
        )}
        {githubId && (
          <a
            href={githubURL}
            target="_blank"
            rel="noreferrer"
            className="w-8 mr-2"
          >
            <GitHubIcon className="fill-current" />
          </a>
        )}
        <Link to="/rss.xml" className="w-8 mr-2">
          <RssIcon className="fill-current" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
