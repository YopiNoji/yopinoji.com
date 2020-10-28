import { Link } from "gatsby";
import React from "react";
import { H1 } from "@Components/atoms/Typography";

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/">
        <H1>{"Blog"}</H1>
      </Link>
    </header>
  );
};

export default Header;
