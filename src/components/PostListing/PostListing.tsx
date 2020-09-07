import React from "react"
import { Link } from "gatsby"

type PropsType = {
  postEdges: any;
}

const Post: React.FC<PropsType> = props => {
  const postList = [];
  props.postEdges.forEach(postEdge => {
    postList.push({
      path: postEdge.node.frontmatter.slug,
      category: postEdge.node.frontmatter.category,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.frontmatter.date,
    });
  });
  return (
    <div className="container max-w-md mx-auto mt-10">
    {postList.map((row, index) => (
      <div className="rounded overflow-hidden shadow-lg pa-2" key={index}>
        <Link to={row.path} key={row.title}>
          {/* <Image filename={post.cover} /> */}
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{row.title}</h2>
            <p className="text-gray-700 text-base">
              {row.date}
            </p>
            <p className="text-gray-700 text-base">
              {row.category}
            </p>
          </div>
        </Link>
      </div>
    ))}
  </div>
  )
}
export default Post