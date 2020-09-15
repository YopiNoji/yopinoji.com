import React from "react"
import { graphql } from "gatsby"
import Layout from '../layout/Base'
import SEO from '../components/SEO/SEO'
import { Query } from '../gatsby-graphql'

type PropsType = {
  data: Query;
}

const Post: React.FC<PropsType> = props => {
  const html = props.data.markdownRemark?.html ? props.data.markdownRemark?.html : ''
  return (
    <Layout>
      <SEO siteMeta={props.data.site?.siteMetadata} postMeta={props.data.markdownRemark} isPost={true}/>
      <div className="mb-6">
        <h1 className="text-2xl py-0">{props.data.markdownRemark?.frontmatter?.title}</h1>
        <span className="text-sm">{props.data.markdownRemark?.frontmatter?.date}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </Layout>
  )
}
export const pageQuery = graphql`
  query Post($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        image
      }
    }
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