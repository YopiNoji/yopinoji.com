import React from "react";
import { StaticQuery, graphql } from "gatsby";
import PostListing from "../PostListing/PostListing";
import "./RelatedPosts.css";

const RelatedPosts = ({ post }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
          edges {
            node {
              frontmatter {
                title
                cover
                date
                category
                tags
              }
              fields {
                slug
                date
              }
            }
          }
        }
      }
    `}
    render={data => {
      const relatedPosts = data.allMarkdownRemark.edges.filter(edge => {
        if (edge.node.frontmatter.title === post.title) {
          return false;
        }
        for (let i = 0; i < edge.node.frontmatter.tags.length; i += 1) {
          for (let j = 0; j < post.tags.length; i += 1) {
            if (edge.node.frontmatter.tags[i] === post.tags[j]) {
              return true;
            }
            return false;
          }
        }
        return false;
      });
      if (!relatedPosts) {
        return null;
      }
      return (
        <div className="related-posts">
          <h2 className="related-posts-title">関連記事</h2>
          <PostListing postEdges={relatedPosts} />
        </div>
      );
    }}
  />
);

export default RelatedPosts;
