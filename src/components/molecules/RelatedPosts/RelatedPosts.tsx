import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { MarkdownRemarkFrontmatter, Query } from "../../../gatsby-graphql";
import { H2, SmallText } from "@Components/atoms/Typography";
import { Badge } from "@Components/atoms/Badge";
import { Card } from "@Components/atoms/Card";

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
    array01: unknown[] | null | undefined,
    array02: unknown[] | null | undefined
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relatedPosts.map((row, index) => (
          <Card key={index}>
            <Link
              to={String("/" + row.node.frontmatter?.slug)}
              key={row.node.frontmatter?.title}
            >
              <div className="px-6 py-4">
                <H2>{row.node.frontmatter?.title}</H2>
                <SmallText>{row.node.frontmatter?.date}</SmallText>
                <Badge>{row.node.frontmatter?.category}</Badge>
                <br />
                {row.node.frontmatter?.tags?.map((row, index) => (
                  <Badge key={index}>{row}</Badge>
                ))}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
};
