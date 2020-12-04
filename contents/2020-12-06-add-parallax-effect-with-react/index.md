---
title: "React で UI にパララックス効果を追加するためのライブラリ比較のような記事"
cover: "2020-12-06-add-parallax-effect-with-react/header.png"
category: "Tech"
date: "2020-12-06"
slug: "add-parallax-effect-with-react"
tags:
  - エンジニア組織
---

## react-scroll-parallax を使った実装

https://github.com/jscottsmith/react-scroll-parallax

```bash
npm i react-scroll-parallax
```

```json
{
  "dependencies": {
    "react-scroll-parallax": "^2.3.5"
  }
}
```

React を使っている場合は、ルートコンポーネントもしくは react-scroll-parallax を使う範囲を ParallaxProvider でラップしてあげる必要があります。

Gatsby を使っている場合は、`gatsby-browser.js` で以下のように ParallaxProvider でラップしてあげる必要があります。  
（現行バージョンの Gatsby では `gatsby-browser.js` がルートファイルとしての役割を持ちます）

```js
import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

export const wrapRootElement = ({ element }) => (
  <ParallaxProvider>{element}</ParallaxProvider>
);
```

```tsx
import React from "react";
import { Parallax } from "react-scroll-parallax";

export const SampleParallax: React.FC = (props) => {
  return (
    <>
      {[...Array(20).keys()].map((row, index) => (
        <Parallax
          y={[70, 100]}
          y={[Math.round(Math.random() * 100), Math.round(Math.random() * 100)]}
          key={index}
        >
          <p>TEST</p>
        </Parallax>
      ))}
    </>
  );
};
```

ランダムに不規則なパララックス効果が実装したい場合は、数値の箇所で以下のよう乱数を生成してあげれば実装可能です。

```js
Math.round(Math.random() * 100
```

### react-scroll-parallax を使った感想

- パララックス効果のみを実装できる
- 現バージョンだと TypeScript 周りのサポートが弱い

## react-spring を使った実装

React でアニメーション系のライブラリの大本命だと思っている react-spring からもパララックスを実装するための API が提供されていたので、こちらも試します。

https://www.react-spring.io/
