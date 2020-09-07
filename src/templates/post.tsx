import React from "react"
import { graphql } from "gatsby"
import Layout from '../layout/default'

type PropsType = {
  data: any;
}

const Post: React.FC<PropsType> = props => {
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
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
  query($slug: String!) {
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