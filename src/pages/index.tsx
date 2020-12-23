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
  const language =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language;
  const Posts = props.data.allMarkdownRemark.edges.filter((edge) => {
    let filterdPost;
    switch (language) {
      case "en":
      case "en-US":
        filterdPost = edge.node.frontmatter?.lang === "en";
        break;
      case "ja":
      case "ja-JP":
        filterdPost = edge.node.frontmatter?.lang === "ja";
        break;
      case "zh-CN":
      case "zh-Hans":
      case "zh-SG":
        filterdPost = edge.node.frontmatter?.lang === "en";
        break;
      case "zh-Hant":
      case "zh-MO":
      case "zh-HK":
      case "zh-TW":
        filterdPost = edge.node.frontmatter?.lang === "en";
        break;
      default:
        return edge.node.frontmatter?.lang === "en";
    }
    return filterdPost;
  });
  return (
    <Base siteMetadata={siteMetadata}>
      <SEO siteMetadata={siteMetadata} isPost={false} />
      <PostListing data={Posts} />
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
            lang
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
