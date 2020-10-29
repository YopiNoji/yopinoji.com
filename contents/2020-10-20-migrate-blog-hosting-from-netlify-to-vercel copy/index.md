---
title: "ブログのホスティングサービスを Netlify から Vercel に移行した話"
cover: "2020-10-20-migrate-blog-hosting-from-netlify-to-vercel/header.png"
category: "Tech"
date: "2020-10-20"
slug: "migrate-blog-hosting-from-netlify-to-vercel"
tags:
  - Netlify
  - Vercel
  - JAMstack
---

```gql
query MyQuery {
  allMarkdownRemark(filter: { frontmatter: { category: { eq: "Tech" } } }) {
    edges {
      node {
        id
        frontmatter {
          tags
          category
        }
      }
    }
  }
}
```
