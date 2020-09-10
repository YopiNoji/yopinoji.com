import React from "react"
import { graphql } from "gatsby"
import Layout from '../layout/Base'
import { PostQuery } from '../gatsby-graphql'

type PropsType = {
  data: PostQuery;
}

const Post: React.FC<PropsType> = props => {
  const html = props.data.markdownRemark?.html ? props.data.markdownRemark?.html : ''
  const frontmatter = props.data.markdownRemark?.frontmatter ? props.data.markdownRemark?.frontmatter : ''
  return (
    <Layout>
      <div className="container">
        <div className="mb-2">
          <h1 className="text-xl">{frontmatter.title}</h1>
          <h2 className="text-sm">{frontmatter.date}</h2>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }}/>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query Post($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        slug
        title
      }
    }
  }
`
export default Post