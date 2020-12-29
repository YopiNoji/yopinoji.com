import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { H1 } from "@Components/atoms/Typography";
import { Toggle } from "@Components/atoms/Toggle";
import { SiteSiteMetadata } from "../../../gatsby-graphql";
import TwitterIcon from "@Assets/Icon/twitter.svg";
import RssIcon from "@Assets/Icon/rss.svg";
import GitHubIcon from "@Assets/Icon/github.svg";

interface HeaderProps {
  siteMetadata?: SiteSiteMetadata | null;
}
const checkDarkMode = () => {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

const Header: React.FC<HeaderProps> = ({ siteMetadata }) => {
  const title = siteMetadata?.title;
  const twitterId = siteMetadata?.twitterId;
  const githubId = siteMetadata?.githubId;
  const [isDarkMode, setIsDarkMode] = useState(checkDarkMode());
  useEffect(() => {
    // Set `Dark Mode` option
    if (isDarkMode) {
      setDarkMode();
    } else {
      unsetDarkMode();
    }
  }, [isDarkMode]);
  const handleOnChange = (v: boolean) => {
    if (v) {
      setDarkMode();
    } else {
      unsetDarkMode();
    }
  };
  const setDarkMode = () => {
    document.querySelector("html")?.classList.add("dark");
    setIsDarkMode(true);
  };
  const unsetDarkMode = () => {
    document.querySelector("html")?.classList.remove("dark");
    setIsDarkMode(false);
  };
  return (
    <header>
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <H1>{title}</H1>
        </Link>
        <div className="w-12 mr-2">
          <Toggle onChange={handleOnChange} defaultValue={!isDarkMode}></Toggle>
        </div>
        {twitterId && (
          <a
            href={`https://twitter.com/${twitterId}`}
            target="_blank"
            rel="noreferrer"
            className="w-8 mr-2"
          >
            <TwitterIcon className="fill-current text-gray-700 dark:text-gray-300" />
          </a>
        )}
        {githubId && (
          <a
            href={`https://github.com/${githubId}`}
            target="_blank"
            rel="noreferrer"
            className="w-8 mr-2"
          >
            <GitHubIcon className="fill-current text-gray-700 dark:text-gray-300" />
          </a>
        )}
        <Link to="/rss.xml" className="w-8 mr-2">
          <RssIcon className="fill-current text-gray-700 dark:text-gray-300" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
