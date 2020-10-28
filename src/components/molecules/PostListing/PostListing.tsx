import React from "react"
import { Link } from "gatsby"
import { Query, MarkdownRemarkFrontmatter } from '../../../gatsby-graphql'
import { H2, SmallText } from '@Components/atoms/Typography'
import { Badge } from '@Components/atoms/Badge'

type PropsType = {
  data: Query;
}

export const PostListing: React.FC<PropsType> = props => {
  const postList: MarkdownRemarkFrontmatter[] = props.data.allMarkdownRemark.edges.map(edges => {
    const post = {
      slug: edges.node.frontmatter?.slug,
      category: edges.node.frontmatter?.category,
      tags: edges.node.frontmatter?.tags,
      cover: edges.node.frontmatter?.cover,
      title: edges.node.frontmatter?.title,
      date: edges.node.frontmatter?.date,
    }
    return post
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {postList.map((row, index) => (
      <div className="rounded overflow-hidden shadow-lg m-2 p-2 transition duration-500 ease-in-out hover:bg-black hover:text-white" key={index}>
        <Link to={String(row.slug)} key={row.title}>
          {/* <Image filename={String(row.cover)} /> */}
          <div className="px-6 py-4">
            <H2>{row.title}</H2>
            <SmallText>{row.date}</SmallText>
            <Badge bgColor="bg-pink-300">{row.category}</Badge>
            <br />
            {row.tags?.map((row, index) => {
              return <Badge key={index}>{row}</Badge>
            })}
          </div>
        </Link>
      </div>
    ))}
  </div>
  )
}
