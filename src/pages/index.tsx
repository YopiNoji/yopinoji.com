import React from "react";
import Base from "@Components/organisms/Base";
import { PostListing } from "@Components/molecules/PostListing";
import { SEO } from "@Util/SEO";
import { graphql } from "gatsby";
import { Query } from "../gatsby-graphql";

type PropsType = {
  data: Query;
};

const Index: React.VFC<PropsType> = (props) => {
  const siteMetadata = props.data.site?.siteMetadata;
  return (
    <Base siteMetadata={siteMetadata}>
      <SEO siteMetadata={siteMetadata} isPost={false} />
      <PostListing data={props.data.allMarkdownRemark.edges} />
    </Base>
  );
};

export default Index;

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        image
        twitterId
        copyright
        lang
        charSet
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            category
            cover
            date
            slug
            tags
            title
          }
        }
      }
    }
  }
`;
