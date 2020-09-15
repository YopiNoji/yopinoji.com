import React from "react"
import Layout from '../layout/Base'
import PostListing from '../components/PostListing/PostListing'
import SEO from '../components/SEO/SEO'
import { graphql } from "gatsby"
import { Query } from '../gatsby-graphql'

type PropsType = {
  data: Query;
}

const Index: React.FC<PropsType>  = props => {
  return (
    <Layout>
      <SEO siteMeta={props.data.site?.siteMetadata} postMeta={null} isPost={false}/>
      <PostListing data={props.data} />
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
query Index {
  site {
    siteMetadata {
      title
      siteUrl
      description
      author
      image
    }
  }
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      node {
        frontmatter {
          category
          cover
          date
          slug
          tags
          title
        }
      }
    }
  }
}
`;

