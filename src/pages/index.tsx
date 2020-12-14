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
  const title = props.data.site?.siteMetadata?.title
    ? props.data.site?.siteMetadata?.title
    : "";
  const siteMetadata = props.data.site?.siteMetadata;
  return (
    <Base title={title}>
      <SEO siteMeta={siteMetadata} isPost={false} />
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
