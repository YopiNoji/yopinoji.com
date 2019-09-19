import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import TagListing from "../components/TagListing/TagListing";
import "./index.css";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header config={config} />
        {children}
        <TagListing />
        <Footer config={config} />
      </div>
    );
  }
}
