import React from "react";
import { Link } from "gatsby";
import { Query, MarkdownRemarkFrontmatter } from "../../../gatsby-graphql";
import { H2, SmallText } from "@Components/atoms/Typography";
import { Badge } from "@Components/atoms/Badge";
import { Card } from "@Components/atoms/Card";
import { useSpring, animated } from "react-spring";

type PropsType = {
  data: Query;
};

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const PostListing: React.FC<PropsType> = (props) => {
  const [springProps, setSpring] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const onMouseMoveHandle = (e: { clientX: number; clientY: number }) =>
    setSpring({ xys: calc(e.clientX, e.clientY) });

  const onMouseLeaveHandle = (e: { clientX: number; clientY: number }) =>
    setSpring({ xys: [0, 0, 1] });

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
      {postList.map((row, index) => {
        return (
          <animated.div
            key={index}
            onMouseMove={onMouseMoveHandle}
            onMouseLeave={onMouseLeaveHandle}
            style={{ transform: springProps.xys.interpolate(trans) }}
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
          </animated.div>
        );
      })}
    </div>
  );
};
