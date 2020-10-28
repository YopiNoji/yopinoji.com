import React from "react";
import { graphql } from "gatsby";
import Layout from "@Components/templates/PostBase";
import { SEO } from "@Util/SEO";
import { H1, SmallText } from "@Components/atoms/Typography";
import { Query } from "../gatsby-graphql";

type PropsType = {
  data: Query;
};

const Post: React.FC<PropsType> = (props) => {
  const html = props.data.markdownRemark?.html
    ? props.data.markdownRemark?.html
    : "";
  return (
    <Layout>
      <SEO
        siteMeta={props.data.site?.siteMetadata}
        postMeta={props.data.markdownRemark}
        isPost={true}
      />
      <H1>{props.data.markdownRemark?.frontmatter?.title}</H1>
      <SmallText>{props.data.markdownRemark?.frontmatter?.date}</SmallText>
      <div className="mb-6" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};
export const pageQuery = graphql`
  query Post($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        image
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        slug
        title
      }
    }
  }
`;
export default Post;
