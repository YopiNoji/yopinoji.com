import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { MarkdownRemarkFrontmatter, Query } from "../../../gatsby-graphql";
import { H2 } from "@Components/atoms/Typography";
import { PostListing } from "@Components/molecules/PostListing";

type PropsType = {
  frontmatter: MarkdownRemarkFrontmatter;
};

export const RelatedPosts: React.FC<PropsType> = ({ frontmatter }) => {
  const data: Query = useStaticQuery(graphql`
    query RelatedPostsQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              slug
              title
              category
              tags
            }
          }
        }
      }
    }
  `);
  const category = frontmatter?.category;
  const title = frontmatter?.title;
  const tags = frontmatter?.tags;
  const getArraysIntersect = (
    array01?: unknown[] | null,
    array02?: unknown[] | null
  ) => {
    if (!array02 || !array01) {
      return false;
    }
    return (
      [...array01, ...array02].filter(
        (item) => array01.includes(item) && array02.includes(item)
      ).length > 0
    );
  };
  const relatedPosts = data.allMarkdownRemark.edges.filter(
    (post) =>
      post.node.frontmatter?.category === category &&
      getArraysIntersect(post.node.frontmatter?.tags, tags) &&
      post.node.frontmatter?.title !== title
  );
  if (!relatedPosts.length) {
    return null;
  }
  return (
    <>
      <H2>関連記事</H2>
      <PostListing data={relatedPosts} />
    </>
  );
};
