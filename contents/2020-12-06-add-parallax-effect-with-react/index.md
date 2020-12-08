---
title: "React で UI にパララックス効果を追加するためのライブラリ比較のような記事"
cover: "2020-12-06-add-parallax-effect-with-react/header.png"
category: "Tech"
date: "2020-12-06"
slug: "add-parallax-effect-with-react"
tags:
  - React
  - アニメーション
---

React を使ってパララックス効果を付与した UI を楽に実装したいなと思いまして、色々なライブラリを使ってみたので、その備忘録的なメモです

## react-scroll-parallax を使った実装

https://github.com/jscottsmith/react-scroll-parallax

```bash
npm i react-scroll-parallax
```

試したバージョンは以下です。

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

const SampleParallax: React.FC = (props) => {
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
export defalut SampleParallax;
```

ランダムに不規則なパララックス効果が実装したい場合は、数値の箇所で以下のよう乱数を生成してあげれば実装可能です。

```js
Math.round(Math.random() * 100
```

### react-scroll-parallax を使った感想

- パララックス効果のみを簡単に実装できる
- パララックス効果以外のアニメーションの実装は期待できない
- 現バージョンだと TypeScript 周りのサポートが弱い

## react-spring を使った実装

React でアニメーション系のライブラリの大本命だと自分が思っている react-spring からもパララックスを実装するための API が提供されていたので、こちらも試します。

https://www.react-spring.io/docs/props/parallax

```bash
npm install react-spring
```

```json
{
  "dependencies": {
    "react-spring": "^8.0.27"
  }
}
```

マウスカーソル移動でパララックスのような動きをするようなサンプルを以下に用意してみました。

```jsx
import React from "react";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x}px,${y}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;

const App = (props) => {
  const [springProps, setSpring] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const onMouseMoveHandle = (e) =>
    setSpring({ xy: calc(e.clientX, e.clientY) });

  return (
    <>
      {[...Array(20).keys()].map((row, index) => {
        return (
          <div onMouseMove={onMouseMoveHandle} key={index}>
            <animated.div
              style={{ transform: springProps.xy.interpolate(trans1) }}
            >
              <p>{row}</p>
            </animated.div>
            <animated.div
              style={{ transform: springProps.xy.interpolate(trans2) }}
            >
              <p>{row}/</p>
            </animated.div>
          </div>
        );
      })}
    </>
  );
};
export default App;
```

上記の例の `translate3d()` のように CSS プロパティを自分で指定して使うことができるので、思った通りのアニメーションを実装できそうです。

サンプルを CodeSandbox で用意してみたので、自由に弄ってみてください。

<iframe src="https://codesandbox.io/embed/react-spring-ti6s4?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="react-spring"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### react-spring を使った感想

- パララックス効果以外のアニメーションの実装にも活用できる
- 提供されている API の理解に少し学習する必要がありそう
- より詳細な動きを指定したアニメーションの実装が可能

## まとめ

- react-spring を使った方が良さそう
