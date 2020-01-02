---
title: "Homebrewを使わずにMacOSにGitをインストールする方法とその問題点"
cover: '2020-01-02-install-git-in-mac-without-homebrew/header.png'
category: "Tech"
date: "2020-01-02"
slug: "install-git-in-mac-without-homebrew"
tags:
    - Mac
    - Git
---

最近、年末年始ということで思い切ってPCのクリーンインストールを行い、Gitなど開発に使うものを全てインストールしなおしました。

GitをMacにインストールする際に一般的なのは、Mac用のパッケージ管理ソフトHomebrewを使ってインストールする方法だと思います。  
Googleで「Git Mac インストール」と検索してみましたが、HomebrewでGitをインストールする方法の紹介がほとんどでした。

突然ですが、私は自分のPCには不要なソフトは極力インストールしたくない派です。  
Homebrewなど、しばらくするとあまり触らなくなるソフトはできるだけインストールしたくない性分です。

そのため、Homebrew抜きで純粋にGitだけを簡単にインストールする方法を考えたのですが、  
ただ、結果としてHomebrewを使った方がいいかもしれないねということに気づいたので、その話です。

## Homebrew抜きでMacにGitをインストールする方法

とりあえず、最初にHomebrew抜きでGitをMacにインストールする方法を紹介しておきます。  
ただ、この方法でインストールするかどうかは、最後まで読んでから決めていただければと思います。

とても簡単です。

Macでターミナルを開いて、`git`と入力します。

![install-git-in-mac-without-homebrew-01](./install-git-in-mac-without-homebrew-01.png)

Gitがインストールされていない場合、コマンドラインデベロッパーツールのインストールを促されます。  
コマンドラインデベロッパーツールはiOSアプリ開発で使うXCodeをインストールすると入るツールなのですが、実はXCode抜きでもいれることができます。

![install-git-in-mac-without-homebrew-02](./install-git-in-mac-without-homebrew-02.png)

コマンドラインデベロッパーツールのインストールが終わったら、すでにGitコマンドが使えるようになっています。

## 問題点

さて、Homebrew抜きでGitを使える状態まで持っていくことはできたのですが、  
残念ながら、**このインストール方法には重大な問題点があったのです。**

それは、**Gitのバージョンを簡単に変更できないことです。**

バージョン管理にHomebrewを使わないので、当たり前といえば当たり前ですが、  
Gitそれ自体に脆弱性があった場合など、バージョン変更が容易ではないと少し困ります。

実は、この記事を書いている最近にもGitに脆弱性がありました。  
https://forest.watch.impress.co.jp/docs/news/1223826.html

こういった際にHomebrewを使っていれば、以下のコマンド一行でアップデートすることが可能です。

```
brew upgrade
```

Homebrewを使っていない場合、今後のことも考えてHomebrewでGitをインストールしなおすのが賢明な気がします。

## 結論

何か問題があった際にすぐにバージョンを切り替えられるのはHomebrewの強みですね。  
やっぱりGitのインストールはHomebrew使った方がいい気がします。

    