import React from "react"
import { Link } from "gatsby"
import { IndexQuery, MarkdownRemarkFrontmatter } from '../../gatsby-graphql'

type PropsType = {
  data: IndexQuery;
}

const Post: React.FC<PropsType> = props => {
  const postList: MarkdownRemarkFrontmatter[] = props.data.allMarkdownRemark.edges.map(edges => {
    if (!edges || !edges.node || !edges.node.frontmatter) { return {} }
    const post = {
      slug: String(edges.node.frontmatter.slug),
      category: edges.node.frontmatter.category,
      tags: edges.node.frontmatter.tags,
      cover: edges.node.frontmatter.cover,
      title: edges.node.frontmatter.title,
      date: edges.node.frontmatter.date,
    }
    return post
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {postList.map((row, index) => (
      <div className="rounded overflow-hidden shadow-lg m-2 p-2" key={index}>
        <Link to={row.slug} key={row.title}>
          {/* <Image filename={post.cover} /> */}
          <div className="px-6 py-4">
            <h2 className="text-3xl mb-3 leading-snug">{row.title}</h2>
            <p className="text-lg mb-4">
              {row.date}
            </p>
            <p className="text-lg mb-4">
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