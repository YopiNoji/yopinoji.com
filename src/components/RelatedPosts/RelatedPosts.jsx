import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

const RelatedPosts = ({ post }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { fields: [fields___date], order: DESC }
        ){
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
      const relatedPosts = data.allMarkdownRemark.edges.filter(
        edge => 
        {
          if(edge.node.frontmatter.title === post.title){
            return false
          }
          if(edge.node.frontmatter.category !== post.category){
            return false
          }
          for (let i = 0; i < edge.node.frontmatter.tags.length; i++) {
            if (edge.node.frontmatter.tags[i] !== post.tags[i]){
              return false
            }
            else{
              return true
            }
          }
        }
      );
      if (!relatedPosts) { return null; }
      return (
        <div className="related-posts">
          <h2 className="related-posts-title">関連記事</h2>
            {relatedPosts.map(relatedPost => (
              <div className="related-post">
                <Link to={relatedPost.node.fields.slug} key={relatedPost.node.frontmatter.title}>
                  <li>{relatedPost.node.frontmatter.title}</li>
                </Link>
              </div>
            ))}
        </div>
      );
    }}
  />
);

export default RelatedPosts;
