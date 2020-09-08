import React from "react"
import Layout from '../layout/default'
import PostListing from '../components/PostListing/PostListing'
import { graphql } from "gatsby"
import { IndexQueryQuery } from '../gatsby-graphql'

type PropsType = {
  data: IndexQueryQuery;
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
query IndexQuery {
  allMarkdownRemark {
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

