import { Link } from "gatsby";
import React from "react";
import { H1 } from "@Components/atoms/Typography";
import { Toggle } from "@Components/atoms/Toggle";

interface HeaderProps {
  title?: string | null;
}

const Header: React.FC<HeaderProps> = ({ title, ...props }) => {
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
        <Link to="/">
          <H1>{title}</H1>
        </Link>
        <div className="w-12">
          <Toggle onChange={handleOnChange}></Toggle>
        </div>
      </div>
    </header>
  );
};

export default Header;
