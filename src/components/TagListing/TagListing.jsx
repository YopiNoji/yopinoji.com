import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import _ from "lodash";

import "./TagListing.css";

const TagListing = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 100
          sort: { fields: [fields___date], order: DESC }
        ) {
          distinct(field: frontmatter___tags)
        }
      }
    `}
    render={data => {
      const tags = data.allMarkdownRemark.distinct;
      return (
        <div className="taglisting">
          <p className="taglisting-title">All Tags</p>
          {tags.map(tag => (
            <Link to={`/tags/${_.kebabCase(tag)}`}>
              <button className="tag" type="button">
                {tag}
              </button>
            </Link>
          ))}
        </div>
      );
    }}
  />
);

export default TagListing;
