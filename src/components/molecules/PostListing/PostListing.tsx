import React from "react";
import { Link } from "gatsby";
import { MarkdownRemarkEdge } from "../../../gatsby-graphql";
import { H2, SmallText } from "@Components/atoms/Typography";
import { Badge } from "@Components/atoms/Badge";
import { Card } from "@Components/atoms/Card";
import { useSpring, animated } from "react-spring";

type PropsType = {
  data: MarkdownRemarkEdge[];
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

  console.log(props);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {props.data.map((row, index) => {
        return (
          <animated.div
            key={index}
            onMouseMove={onMouseMoveHandle}
            onMouseLeave={onMouseLeaveHandle}
            style={{ transform: springProps.xys.interpolate(trans) }}
          >
            <Card>
              <Link
                to={String(row.node.frontmatter?.slug)}
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
          </animated.div>
        );
      })}
    </div>
  );
};
