---
title: "Gatsby によるブログを i18n対応（多言語化対応）して Markdown を言語によって出し分ける"
cover: "2020-12-26-add-i18n-support-to-gatsby-for-markdown/header.png"
category: "Tech"
lang: "ja"
date: "2020-12-26"
slug: "add-i18n-support-to-gatsby-for-markdown"
tags:
  - Gatsby
  - i18n
---

## 求めるもの

- Gatsby(React.js)を使った環境を想定
- Gatsby では Markdown に投稿内容を記載する使い方をしている
- ブラウザの言語設定に応じて、Markdown で書いた記事を各言語に応じたものを表示したい

## 一般的な i18n 対応（多言語化対応）のライブラリについて

まず、i18n 対応する際に一般的なライブラリについての話です。

- [react-i18next](https://github.com/i18next/react-i18next)
- [polyglot](https://github.com/airbnb/polyglot.js)

どのライブラリも基本的には Json ファイルに各言語の文言を記載しておいて、言語設定に応じて Json から読み込む言語を切り替えるといった使い方をします。

ただ、今回は Json による多言語化対応を行いません。  
今回行うのはあくまでも言語設定に応じた Markdown の出しわけです。

なので基本的にライブラリを使わずに行います。

## ブラウザの言語設定に応じて処理を出し分ける

まず、ブラウザの言語設定をどうやって取得するのかについてですが、これは簡単です。  
ブラウザで `window.navigator.language` から取得可能です。

以下が参考になります。

https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language

ブラウザ側での言語の識別子は、英語だけでも `en`、`en-US`、`en-GB` など様々な種類があり、それをサポートする必要があります。

言語の識別子について、詳細は以下に書いてあります。

https://www.ietf.org/rfc/bcp/bcp47.txt

さて、今まで述べたことを JavaScript のコードとして簡単に落とし込むと、下記のようになります。

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

ブラウザの言語設定を取得して、言語に応じて処理を分岐させます。  
あとは、これを応用して Markdown を言語によって使い分ける処理を書けば完了です。

## Gatsby でマークダウンをブラウザの言語設定に応じて出し分ける

まず、各 Markdown の Frontmatter に言語設定（language）を追加します。

また、投稿 URL のスラッグについて各言語で被ることが無いように、`en/` などの接頭辞を追加します。

Frontmatter については以下を参照。

https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/#frontmatter-for-metadata-in-markdown-files

以下はサンプルです。

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

上記のように追加することで、Gatsby の GraphQL を使い各記事の言語情報を取得可能になります。

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

GraphQL のサンプルは上記です。

あとは、先ほど述べたようにブラウザの言語設定を取得して処理を分岐させるだけです。

以下はサンプルです。

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

上記のようにしておけば、後々にボタンを設置して表示する言語の切替なども楽に実装できそうです。

以下に自分が Gatsby の多言語化対応をした際の変更箇所が見れるのでそちらも参考にしてみてください。

https://github.com/YopiNoji/yopinoji.com/pull/54
