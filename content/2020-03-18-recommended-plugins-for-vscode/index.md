---
title: "VSCode のおすすめプラグインをリストアップしていく記事"
cover: "2020-03-18-recommended-plugins-for-vscode/header.png"
category: "Tech"
date: "2020/03/18"
slug: "recommended-plugins-for-vscode"
tags:
  - VSCode
---

VSCode のおすすめプラグインについて、リストアップしていく記事です。

フロントエンド寄りの目線で書いています。

あと、今の会社に VSCode ユーザーが少ないので、VSCode 教の新規入信者に対して「これ入れておくといいよ」って言う用途にも使う予定です。

## [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

自分が VSCode を使う理由のひとつでもあります。

このプラグインを活用することで、ソースコードを保存した際に ESLint のルールに乗っ取って自動でソースコードを整形してくれます。  
こいつのおかげで、わざわざ ESLint のルールを確認してソースコードを修正する手間は限りなくなくなります。

プラグインをインストールした後に、設定を追加する必要があるのですが、[こちら](https://qiita.com/moriyuu/items/6bac1c75c61d9d359f96)を参考に設定してみてください。

## [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

自分が VSCode を使うもう 1 つの理由です。

例によって設定が必要ですが、ソースコードを自動整形してくれます。

CSS や SCSS、JSON の整形もできるのが地味に嬉しいところ。

## [Remote SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

AWS EC2 などの環境にリモートで入り込んで作業できるプラグインです。

ローカル開発環境というものが存在しないスタートアップ、本番環境で作業する必要があるケース、EC2 で直に開発をしている職場などで非常に重宝します。

[使い方についての記事](ssh-remote-server-via-vscode/)は別途書きましたので、一読してもみてください。

## [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

![GitGraph.png](./GitGraph.png)

Git の変更履歴を見やすく綺麗に表示してくれるプラグインです。

`git log --oneline --graph --decorate` でそこそこ見やすくできるとはいっても、複雑になると意味不明になりますよね。

専用の GUI ツールなどを使ってもいいのですが、VSCode 使いならプラグインで解決できます。

そう VSCode ならね。
