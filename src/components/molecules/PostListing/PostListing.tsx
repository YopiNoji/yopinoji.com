import React from "react";
import { Link } from "gatsby";
import { Query, MarkdownRemarkFrontmatter } from "../../../gatsby-graphql";
import { H2, SmallText } from "@Components/atoms/Typography";
import { Badge } from "@Components/atoms/Badge";
import { Card } from "@Components/atoms/Card";
import { Parallax } from "react-scroll-parallax";

type PropsType = {
  data: Query;
};

export const PostListing: React.FC<PropsType> = (props) => {
  const postList: MarkdownRemarkFrontmatter[] = props.data.allMarkdownRemark.edges.map(
    (edges) => {
      const post = {
        slug: edges.node.frontmatter?.slug,
        category: edges.node.frontmatter?.category,
        tags: edges.node.frontmatter?.tags,
        cover: edges.node.frontmatter?.cover,
        title: edges.node.frontmatter?.title,
        date: edges.node.frontmatter?.date,
      };
      return post;
    }
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {postList.map((row, index) => (
        <Parallax
          y={[Math.round(Math.random() * 70), Math.round(Math.random() * 20)]}
          key={index}
        >
          <Card>
            <Link to={String(row.slug)} key={row.title}>
              <div className="px-6 py-4">
                <H2>{row.title}</H2>
                <SmallText>{row.date}</SmallText>
                <Badge>{row.category}</Badge>
                <br />
                {row.tags?.map((row, index) => (
                  <Badge key={index}>{row}</Badge>
                ))}
              </div>
            </Link>
          </Card>
        </Parallax>
      ))}
    </div>
  );
};
