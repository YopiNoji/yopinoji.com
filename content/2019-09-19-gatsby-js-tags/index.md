---
title: "GraphQLで一意の値を取得することでGatsbyブログにタグ一覧を作る"
cover: '2019-09-19-gatsby-js-tags/header.png'
category: "Tech"
date: "2019/09/19"
slug: "gatsby-js-tags"
tags:
    - Gatsby
---

![Gatsby](./gatsby.png)

Gatsbyで作成したブログにタグ一覧を表示する機能を実装したので、その話です。

なお、本記事では既に記事に対してタグ機能が実装済みという前提で話が進んでいきます。  
GraphQLを用いて重複しないタグ情報を取得するということについて主に書いています。  

## そもそもGatsbyはどのようにデータ取得しているのか

![GraphQL](./graphql-gui.png)

もう既にご存知かもしれませんが、GatsbyではGraphQLを用いてデータを取得しています。  
GraphQLで取得したデータを元に、静的サイトを生成しているわけです。

Gatsbyをローカル環境で動作している場合、[localhost:8000/___graphql](http://localhost:8000/___graphql)にアクセスすることで、GraphQLのクエリをGUIから試してみることができます。  
GUIの左側の入力欄にクエリを入力して実行ボタンを押すと、取得したデータ（JSON形式）を確認する事ができます。  

試しに、自分の環境で以下のクエリを実行してみます。

```JavaScript
{
  allMarkdownRemark(
    limit: 1000
    sort: { fields: [fields___date], order: DESC }
  ) {
    edges {
      node {
        html
        fields {
          slug
          date
        }
        frontmatter {
          title
          category
          tags
          cover
          date
        }
      }
    }
  }
}
```

登録されている記事のデータが取得できました。  
上記のクエリでは、取得データの上限を1000件に絞り、fields配列のdate項目を降順（DESC）に並び変えて取得しています。

そのデータの中で、各記事のタグ情報はfrontmatter配列の中にあるtags項目に格納されています。  

## どうやって重複しない値をGraphQLで取得するのか

さて、肝心のGraphQLを使って重複しない値を取得する方法ですが、`distinct`というクエリを使います。  
`distinct`を用いる事で重複を除いた一意の値を取得する事が可能になります。

記事データを取得するクエリを元に、frontmatter配列の中にあるtags項目から重複を除いてデータを取得するクエリを書いてみました。  
試しに、下記のクエリを実行してみます。

```JavaScript
{
  allMarkdownRemark(
    limit: 1000
    sort: { fields: [fields___date], order: DESC }
  ) {
    distinct(field: frontmatter___tags)
  }
}
```

全てのタグ情報から重複を除いてデータ取得する事ができました。  

あとはタグの一覧を表示するコンポーネントを作成するだけですね。

## StaticQueryを用いたコンポーネントを作成する

GatsbyでReactコンポーネントからGraphQLを呼ぶ場合、StaticQueryというものを使います。  
このStaticQueryを使う事で、ページ生成用のファイル以外からもGraphQLを使う事ができます。

StaticQueryを用いてタグの一覧を表示するコンポーネントを作ってみました。  
GatsbyのLinkコンポーネントを用いて、各タグが使われている記事の一覧を表示するページへのリンクもつけてみました。

```javascript
import React from "react";
import { StaticQuery,  graphql } from "gatsby"
import _ from "lodash";
import { Link } from "gatsby";

const TagListing = () => (
  <StaticQuery
    query={graphql`
    query {
      allMarkdownRemark(
        limit: 1000
        sort: { fields: [fields___date], order: DESC }
      ) {
        distinct(field: frontmatter___tags)
      }
    }
    `}

    render={(data) => {
      const tags = data.allMarkdownRemark.distinct
      return (
      <ul>
      {tags.map(tag => (
        <Link
            to={`/tags/${_.kebabCase(tag)}`}
          >
            <li>{tag}</li>
        </Link>
      ))}
      </ul>
      );
    }}
  />
)

export default TagListing;
```

上記のコンポーネントを使う事で、任意の場所にタグ一覧を表示させる事ができました。

## 終わりに

今回は、Gatsbyでタグの一覧を表示する機能を作ってみましたが、  
カテゴリーの一覧を作るなどにも活用する事ができるので、もし機会があれば是非試してみてください。

## 参考

[Gatsby公式 StaticQuery](https://www.gatsbyjs.org/docs/static-query/)
