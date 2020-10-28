import { Link } from "gatsby";
import React from "react";
import { H1 } from "@Components/atoms/Typography";

const Header: React.FC = () => {
  return (
    <Link to="/">
      <H1>{"Blog"}</H1>
    </Link>
  );
};

export default Header;
