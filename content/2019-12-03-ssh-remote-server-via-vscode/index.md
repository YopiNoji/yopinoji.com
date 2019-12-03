---
title: "VSCodeでリモートサーバのコードを直接編集するプラグインが超絶便利だった件"
cover: '2019-12-03-ssh-remote-server-via-vscode/header.png'
category: "Tech"
date: "2019/12/03"
slug: "ssh-remote-server-via-vscode"
tags:
    - VSCode
---
AWSのEC2にあるプログラムを直で編集して開発する必要がある場合、Visual Studio Code（VSCode）でEC2にSSHしてコード編集する方法が簡単かつ便利だったので共有です。

AWSのEC2を使ってる前提で書いてますが、リモートサーバのコードをエディタを使って編集したい用途なら何にでも活用できるはずです。

##前準備
VSCodeでSSHを使う前の準備段階として、SSHのコンフィグ（設定ファイル）を定義してあげる必要があります。

`.ssh/config`にSSH接続先のリモートサーバを定義を記述します。

以下はサンプルです。  
各自の環境に合わせて適宜書き換えてください。

```
Host yopinoji-com
    HostName yopinoji.com
    User ec2-user
    Port 22
    IdentityFile ~/.ssh/key.pem
```

上記のコンフィグを作成することで、`ssh yopinoji-com`とコマンド入力するだけでコンフィグに定義した環境にSSH接続することができるようになります。

SSH接続に問題が無いようであれば前準備は完了です。

##VSCodeでSSHできるようにする

それでは実施にVSCodeでSSH接続する手順です。

VSCodeのプラグインとして提供されている、[Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)をインストールします。

![VScode-Remote-SSH-01](./VScode-Remote-SSH-01.png)

プラグインを検索する画面で「Remote」と入力すれば候補に出てくるはずです。

もし分からなければ、以下のURLからプラグインを手に入れられるはずです。  
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh

プラグインのインストールが完了したら、VSCodeから実際に使ってみましょう。

![VScode-Remote-SSH-02](./VScode-Remote-SSH-02.png)

VSCodeの左下を押下し後に、「Remote-SSH:Connect to Host...」と書かれた箇所を選択します。

![VScode-Remote-SSH-03](./VScode-Remote-SSH-03.png)

「Remote-SSH:Connect to Host...」を選択すると、コンフィグに書かれたSSH接続先が表示されるので、これを使ってSSH接続することができます。

![VScode-Remote-SSH-04](./VScode-Remote-SSH-04.png)

SSH接続に成功すると、VSCode左下が接続先になっているはずです。 

あとは自由にSSH接続先でフォルダを開いて編集するだけです。

##終わりに

今回、AWSのEC2にあるコードをエディタから直接編集する目的でVSCodeのプラグインを試してみましたが、  
時間が経つとSSH接続が勝手に切れるということもなく、非常に使いやすいです。

リモートサーバのコードを直接編集する用途なら本当にオススメなので是非試してみてください。


##参考

[Visual Studio Code Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)


