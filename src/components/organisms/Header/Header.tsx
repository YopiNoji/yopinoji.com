import { Link } from "gatsby";
import React from "react";
import { H1 } from "@Components/atoms/Typography";

const Header: React.FC = () => {
  return (
    <header>
      <div className="mx-12">
        <Link to="/">
          <H1>{"yopinoji.com"}</H1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
