import React from "react"
import Layout from '../layout/default'
import PostListing from '../components/PostListing'
import { graphql } from "gatsby";

type PropsType = {
  data: any;
}

const Index: React.FC<PropsType>  = props => {
  return (
    <Layout>
      <PostListing postEdges={props.data.allMarkdownRemark.edges} />
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

