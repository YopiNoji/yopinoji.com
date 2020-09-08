import React from "react"
import { Link } from "gatsby"
import { IndexQueryQuery, MarkdownRemarkFrontmatter } from '../../gatsby-graphql'

type PropsType = {
  data: IndexQueryQuery;
}

const Post: React.FC<PropsType> = props => {
  const postList: MarkdownRemarkFrontmatter[] = [];
  props.data.allMarkdownRemark.edges.forEach(edges => {
    postList.push({
      slug: edges.node.frontmatter.slug,
      category: edges.node.frontmatter.category,
      tags: edges.node.frontmatter.tags,
      cover: edges.node.frontmatter.cover,
      title: edges.node.frontmatter.title,
      date: edges.node.frontmatter.date,
    });
  });
  return (
    <div className="container max-w-md mx-auto mt-10">
    {postList.map((row, index) => (
      <div className="rounded overflow-hidden shadow-lg pa-2" key={index}>
        <Link to={row.slug} key={row.title}>
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