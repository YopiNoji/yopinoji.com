---
title: "GitHubにCommit/Pushすることで緑豊かな芝生を生やしたい"
cover: '2019-10-21-make-github-contributions-green/header.png'
category: "Tech"
date: "2019/10/21"
slug: "make-github-contributions-green"
tags:
    - GitHub
---

##そもそもGitHubの芝生とは？

プログラミングの学習を進める際に、モチベーションを保つための一つの方法として「GitHubに芝生を生やす」という方法があります。  

これはどういうことかと言うと、GitHubにはCommit/PushなどのアクションをするたびにContributionsという緑色の活動履歴を残せるのですが、  
自分のGitHubのContributionsを緑色で埋めることをモチベーションにしてアウトプットを頑張ろうという方法です。

![github-many-contributions-example](./github-many-contributions-example.png)

毎日頑張ることで上記の画像のようにContributionsに緑豊かな大草原を生やすことだってできるのです。

![github-contributions-art-example](./github-contributions-art-example.png)

さらに頑張ることでContributionsで芸術作品を作ることだって可能です。  
（これはすごい。）

そういった例を知り、改めて自分のGitHubのContributionsを確認してみたのですが、 

![github-my-contributions](./github-my-contributions.png)

**・・・全然芝生生えてなかった。**

自分の勉強不足か。これからもっと頑張らねば。

いやしかし、**よくよく考えてみると自分のGitHubにはCommit/Pushを10回以上しているリポジトリがあるのに、7個しか芝生が生えていないのはどう考えてもおかしい。**

という風になりまして、色々と調べたのでその話です。

##GitHubに芝生が生えない原因は？

色々と調べていくとGitHubに芝生が生えない原因は以下のようです。

- ローカル環境のGit設定ファイルにGitHubアカウントに登録しているメールアドレスが設定されていない場合
- デフォルトブランチ（masterブランチ）にコミットしていない場合

自分の場合、個人開発ではmasterブランチしか利用していないので、考えられる原因はローカル環境でのメールアドレスの設定漏れだけです。

試しにGitの設定を取得するコマンドを入力してみます。  
メールの設定がされていれば、`user.email=your@mail.address`といった形式で設定内容が表示されるはずです。

```sh
$ git config --global -l
fatal: unable to read config file '/Users/yopinoji/.gitconfig': No such file or directory

```

グローバルでの設定ファイルはないと言われてしまいました。  
設定した覚えがないので、当たり前ですが設定ファイルはありません。

それでは次に、実際にGitで管理しているフォルダに移動して、Gitの設定を取得するコマンドを叩いてみます。

```sh
$ git config --local -l
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
remote.origin.url=https://github.com/YopiNoji/gatsby-blog.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.master.remote=origin
branch.master.merge=refs/heads/master
```

ちゃんとGitの設定内容が表示されています。  
ただ、設定内容の中に肝心の`user.email`が見当たりません。  
これが原因みたいですね。

Gitでのメールアドレスの設定を作ります。  
後々に再び設定するのは面倒なので、グローバルでの設定ファイルを作成します。  
以下のコマンドを実行することで、`/Users/ユーザの名前/.gitconfig`に設定ファイルが作成されます。

```sh
$ git config --global user.email "your@email.address"
```

メールアドレスの箇所は自分のGitHubアカウントに登録してあるものに書き換えてください。  
特定のフォルダでのみメールアドレスを設定したい場合は、`--global`を`--local`に書き換えてから実行すれば問題ありません。

コマンド入力後に設定が作成されたことを確認するために以下のコマンドを入力してみます。

```sh
$ git config --global -l
user.email=your@email.address
```

設定内容が表示されていれば、ローカル環境でのメールアドレスの設定は完了です。

それでは早速GitHubに芝生を生やしに行きましょう。  
試しにGitHubにCommit/Pushしてみます。

![after-fix-setting-github-commit-log](./after-fix-setting-github-commit-log.png)

なんということでしょう。  
今まではPCのユーザ名で記されていたコミットログの名前がGitHubアカウントの名前に変わっています。

![after-fix-setting-github-contributions](./after-fix-setting-github-contributions.png)

Contributionsの方も、今まではCommit/Pushで変化がなかったのに、今回はしっかりと更新されています。

おお、これからは自分もGitHubに芝生を生やすことができる！

ただ、今まで何十回としてきたコミットで生えているはずの芝生は生えていませんでした。  
やはり、最初に設定しておかなければ芝生は生えないようです。  
生えたはずの芝生を無駄にしたようでやや残念です。


##終わりに

そんなわけで今日から自分もGitHubに芝生を生やせるようになりました。

いつの日か自分のGitHubに大草原を作ることを目標にアウトプットに励んでいきたいですね。

##参考

[意外と知らないGitHubで草を生やす条件とは](https://findy-code.io/engineer-lab/github-contributions-rule)
