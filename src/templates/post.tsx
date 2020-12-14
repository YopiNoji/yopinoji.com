import React from "react";
import { graphql } from "gatsby";
import PostBase from "@Components/organisms/PostBase";
import { SEO } from "@Util/SEO";
import { H1, SmallText } from "@Components/atoms/Typography";
import { Query } from "../gatsby-graphql";
import { RelatedPosts } from "@Components/molecules/RelatedPosts";

type PropsType = {
  data: Query;
};

const Post: React.FC<PropsType> = (props) => {
  const markdownRemark = props.data.markdownRemark;
  const frontmatter = props.data.markdownRemark?.frontmatter;
  const siteMetadata = props.data.site?.siteMetadata;

  if (!markdownRemark?.html || !frontmatter || !siteMetadata) {
    return null;
  }
  return (
    <PostBase>
      <SEO siteMeta={siteMetadata} postMeta={markdownRemark} isPost={true} />
      <H1>{frontmatter?.title}</H1>
      <SmallText>{frontmatter?.date}</SmallText>
      <div className="mb-6" />
      <div
        className="dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
      <RelatedPosts frontmatter={frontmatter}></RelatedPosts>
    </PostBase>
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
        category
        tags
      }
    }
  }
`;
export default Post;
