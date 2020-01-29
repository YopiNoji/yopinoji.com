---
title: "Git操作を改めてまとめたカンニングペーパー的な記事"
cover: '2020-01-29-how-to-manipulate-git/header.png'
category: "Tech"
date: "2020-01-29"
slug: "how-to-manipulate-git"
tags:
    - Git
---

表題の通り。  
Git操作をよく忘れるので、改めてまとめておいて自分用のカンニングペーパーとして使うための記事です。

## リポジトリの確認

```
git remote -v
```

## 全ブランチの確認

```
git branch -a
```

頭が`remotes`から始まるものがリモートブランチで、それ以外がローカルブランチだと考えておけばOKです。

## リモートブランチからローカルブランチを作成

```
git checkout -b local_branch_name remotes/origin/remote_branch_name
```

ちなみに`origin`はクローン元のリポジトリのこと。

## ローカル変更の取り消し

一旦消したら戻ってこないので気をつけてね！

```
git checkout .
git clean -df .
```

## git add した差分の取り消し

```
git reset HEAD .
```

## fork したリポジトリで本家に追従する

OSS に貢献する際など、フォークしたリポジトリを扱う場合。

```
git remote add root_branch https://github.com/(Fork元のユーザ名)/(フォークしたいリポジトリ.git)
git fetch root_branch
git merge root_branch/master
git push origin master
```

