import React, { Component } from "react";
import { Link } from "gatsby";
import "./Header.css";
import CategoryListing from "../CategoryListing/CategoryListing";

class Header extends Component {
  render() {
    const { config } = this.props;
    const { siteTitle } = config;
    if (!siteTitle) {
      return null;
    }
    return (
      <header className="header">
        <Link to={"/"} className="sitetittle">
          <h1>{siteTitle}</h1>
        </Link>
        <nav className="nav">
          <CategoryListing />
        </nav>
      </header>
    );
  }
}

export default Header;
