import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import _ from "lodash";

const CategoryListing = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 100
          sort: { fields: [fields___date], order: DESC }
        ) {
          distinct(field: frontmatter___category)
        }
      }
    `}
    render={data => {
      const categories = data.allMarkdownRemark.distinct;
      return (
        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          {categories.map(category => (
            <Link to={`/categories/${_.kebabCase(category)}`}>
              <li>{category}</li>
            </Link>
          ))}
          <a
            href="https://yopinoji.info/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </ul>
      );
    }}
  />
);

export default CategoryListing;
