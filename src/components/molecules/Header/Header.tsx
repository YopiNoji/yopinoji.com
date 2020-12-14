import { Link } from "gatsby";
import React from "react";
import { H1 } from "@Components/atoms/Typography";
import { Toggle } from "@Components/atoms/Toggle";

const Header: React.FC = () => {
  const handleOnChange = (v: boolean) => {
    if (v) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  };
  return (
    <header>
      <div className="mx-12 flex">
        <Link to="/">
          <H1>{"yopinoji.com"}</H1>
        </Link>
        <Toggle onChange={handleOnChange}></Toggle>
      </div>
    </header>
  );
};

export default Header;
