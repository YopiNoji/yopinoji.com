import React, { Component } from "react";
import UserLinks from "../UserLinks/UserLinks";
import "./About.css";

class About extends Component {
  render() {
    const { config } = this.props;
    return (
      <div className="about">
        <h1>About This page</h1>
        <p></p>
        <UserLinks config={config} labeled />
      </div>
    );
  }
}

export default About;
