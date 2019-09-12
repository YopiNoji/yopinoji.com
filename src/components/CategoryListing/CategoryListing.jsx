import React from "react";
import { StaticQuery,  graphql } from "gatsby"
import _ from "lodash";
import { Link } from "gatsby";

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

    render={(data) => {
      const categories = data.allMarkdownRemark.distinct
      return (
      <ul>
      {categories.map(category => (
        <Link
            to={`/categories/${_.kebabCase(category)}`}
          >
            <li>{category}</li>
        </Link>
      ))}
      </ul>
      );
    }}
  />
)

export default CategoryListing;

