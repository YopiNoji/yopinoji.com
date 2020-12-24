---
title: "i18n support for Gatsby blogs (multilingual support) and Markdown for different languages"
cover: "2020-12-26-add-i18n-support-to-gatsby-for-markdown/header.png"
category: "Tech"
lang: "ja"
date: "2020-12-26"
slug: "add-i18n-support-to-gatsby-for-markdown"
tags:
  - Gatsby
  - i18n
---

## What I am looking for

- Assuming an environment using Gatsby (React.js)
- In Gatsby, we are using Markdown to write posts.
- Need to display articles written in Markdown according to the language settings of the browser.

## About libraries for general i18n support

First, let's talk about the general libraries for i18n support.

- [react-i18next](https://github.com/i18next/react-i18next)
- [polyglot](https://github.com/airbnb/polyglot.js)

Basically, all of these libraries use a Json file that contains the text of each language, and switch the language to be read from the Json depending on the language setting.

This time, however, I will not use Json to support multilingualization.  
What I am going to do this time is to output Markdown according to the language settings.

So, I would basically do this without using any libraries.

## Differentiate the process according to the browser's language settings

First of all, how to get the language setting of the browser is easy.  
You can get it from `window.navigator.language` in your browser.

The following is a good reference.

https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language

There are various types of language identifiers in the browser, such as `en`, `en-US`, `en-GB`, etc., even for English alone, which need to be supported.

More information about language identifiers can be found at

https://www.ietf.org/rfc/bcp/bcp47.txt

Now, the following is a simple JavaScript code for what I have described so far.

```js
// Get browser language
const language =
  (window.navigator.languages && window.navigator.languages[0]) ||
  window.navigator.language;
switch (language) {
  case "en":
  case "en-US":
  case "en-GB":
    // When English browser
    break;
  case "ja":
  case "ja-JP":
    // When Japanese browser
    break;
  default:
  // When any other language browser
}
```

It retrieves the browser's language settings and splits the process according to the language.  
You can then apply this to write a process that uses Markdown differently depending on the language, and you are done.

## Use Gatsby to serve markdowns according to the language setting of the browser.

First, add a language setting (language) to the Frontmatter of each Markdown.

Also, add a prefix such as `en/` for the slug of the post URL so that there is no conflict between languages.

See below for more information about Frontmatter.

https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/#frontmatter-for-metadata-in-markdown-files

The following is a sample.

```md
---
title: "Post Title"
category: "Poem"
language: "en"
date: "2020-12-28"
slug: "en/test-post"
tags:
  - Poem
  - Gatsby
---

Your post contents is here...
```

By adding the above, you can use Gatsby's GraphQL to get the language information of each article.

```graphql
query Index {
  allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
    edges {
      node {
        frontmatter {
          title
          category
          language
          date
          slug
          tags
        }
      }
    }
  }
}
```

The GraphQL sample is shown above.

All that is left to do is to get the language settings of the browser and branch the process as mentioned earlier.

The following is a sample.

```tsx
import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Query } from "../gatsby-graphql";

type PropsType = {
  data: Query;
};
const Index: React.VFC<PropsType> = (props) => {
  const [state, setState] = useState(siteMetadata?.lang);
  useEffect(() => {
    const language =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language;
    setState(language);
  }, []);
  const Posts = props.data.allMarkdownRemark.edges.filter((edge) => {
    let filterdPost;
    switch (state) {
      case "en":
      case "en-US":
      case "en-GB":
        filterdPost = edge.node.frontmatter?.lang === "en";
        break;
      case "ja":
      case "ja-JP":
        filterdPost = edge.node.frontmatter?.lang === "ja";
        break;
      default:
        return edge.node.frontmatter?.lang === "en";
    }
    return filterdPost;
  });
  return (
    <div className="posts">
      {Posts?.map((row, index) => {
        return (
          <div className="post" key={index}>
            <h2>{String(row.node.frontmatter?.title)}</h2>
            <span>{row.node.frontmatter?.date}</span>
            <span>{row.node.frontmatter?.category}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Index;

export const pageQuery = graphql`
  query Index {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            category
            lang
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
```

If you do the above, you will be able to easily implement buttons to switch languages later on.

You can see the changes I made to Gatsby when I made it multilingual below.

https://github.com/YopiNoji/yopinoji.com/pull/54
