---
title: "React と Tailwind CSS だけを使ってダークモードに対応する"
cover: "2020-12-16-add-dark-mode-feature-to-react-with-tailwindcss/header.png"
category: "Tech"
date: "2020-12-16"
slug: "add-dark-mode-feature-to-react-with-tailwindcss"
tags:
  - React
  - Gatsby
  - Tailwind CSS
  - Dark Mode
---

2020 年 11 月 19 日にリリースされた Tailwind CSS の v2.0。

リリースされた新機能の中にダークモード対応があります。

https://blog.tailwindcss.com/tailwindcss-v2#dark-mode

これを活用すれば Tailwind CSS だけでダークモード対応もできてしまうわけです。

個人的にダークモードを選択することが多いので是非とも試してみたい、というわけで試してみました。

## Tailwind CSS について簡単におさらい

## Tailwind CSS と React でダークモード対応する

### 前提条件

```json
{
  "tailwindcss": "^2.0.1"
}
```

以下のスクリプトを実行すると、実行環境に応じて `html` タグに `dark` というクラス名を追加します。

この `dark` というクラス名が存在する場合はダークモードが有効になります。

```js
// Set "Dark Mode" option
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.querySelector("html").classList.add("dark");
} else {
  document.querySelector("html").classList.remove("dark");
}
```

普通の React を使っている場合は、`React.useEffect()` などを使用してサイト読み込み時に上記のスクリプトを実行してあげてください。

Gatsby を使っている場合は `gatsby-browser.js` に追記すればサイト読み込み時に実行されます。

これでサイトを読み込む環境に応じてダークモードを有効にする実装は完了です。  
あとはダークモードが有効になった際の見た目を変更するだけです。

```tsx
import React from "react";

export const Sample: React.FC = ({ ...props }) => {
  return (
    <div className="text-black dark:text-white dark:bg-black">
      {props.children}
    </div>
  );
};
```

Tailwind CSS でダークモード有効時の CSS プロパティは `dark:` の付いたクラス名で識別できます。  
ダークモード有効時にはこのクラスが優先的に読み込まれます。

上記の例の場合、ダークモード有効時には背景が黒、文字色が白は白になります。
