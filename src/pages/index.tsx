import React from "react"
import Layout from '../layout/Base'
import PostListing from '../components/PostListing/PostListing'
import { graphql } from "gatsby"
import { IndexQuery } from '../gatsby-graphql'

type PropsType = {
  data: IndexQuery;
}

const Index: React.FC<PropsType>  = props => {
  return (
    <Layout>
      <PostListing data={props.data} />
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
query Index {
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

