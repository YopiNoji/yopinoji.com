---
title: "Laravelの開発環境をDockerを使ってサクッと作成する"
cover: '2019-10-29-getting-started-with-laravel-in-docker/header.png'
category: "Tech"
date: "2019/10/29"
slug: "getting-started-with-laravel-in-docker"
tags:
    - Laravel
    - Docker
---

Laravelの開発環境をDockerを使って構築してみたのでその話です。

##なぜDockerを使うのか

###少ないソースコードで簡単に開発環境を構築し管理できる

まず、Dockerではコンテナという単位でサービス(MySQLやNginxなど)を動かしています。  
このコンテナというものはDockerイメージを元に作成することができます。

DockerイメージにはMySQLのイメージやNginxのイメージなどが存在し、主要なイメージについては既に公式に用意され共有されています。  
つまり、Dockerで開発環境を構築する際にはこれらのDockerイメージを元にコンテナを作成し、各コンテナを連携させてあげるだけでOKなのです。  
実際に触ってみるとわかると思いますが、かなり簡単にローカル開発環境を立ち上げることができます。

今回、Laravel開発用にPHP+Nginx+MySQLの環境を作りましたが、それらの環境を定義しているファイルは60行程度の内容で済んでいます。  
コード量も少なく学習コストも少ないため、簡単に触りやすいというのはとても良いことだと思います。  
また、インフラの情報をコードで管理できるというのもDockerの利点ですね。

###コンテナごとデプロイすることで複数の環境で同じ環境を作ることができる

同じアプリケーションを開発してるのに開発メンバーの参入時期によって開発環境が違うということが、チームで開発する際に稀にあると思います。  

ただ、開発環境の統一ということであれば、他の仮想環境構築ツール（Vagrant等）でもある程度は実現可能です。  
Dockerは更に何がすごいかというと、コンテナごとデプロイ可能な点です。

AWSのECS、GCPのGCEなどDockerコンテナごとデプロイできるサービスがいくつかあるのですが、  
こういったサービスを活用すればローカル環境と本番環境で全く同じインフラ構成を使うことができてしまいます。

例えば、開発環境やステージング環境はNginxなのに本番環境はApacheを使っていることが原因で、  
問題があった際に本番環境と同じ環境での検証が困難といったこともあると思います（経験談）。  
それらのチグハグな環境をDockerをコンテナごとデプロイすることで統一することができます。

##Dockerを使える環境を整える

Windowsの場合はDocker Desktop for Windowsをインストールできます。  
https://hub.docker.com/editions/community/docker-ce-desktop-windows

Macの場合は以下のURLからDocker Desktop for Macをインストールできます。  
https://hub.docker.com/editions/community/docker-ce-desktop-mac

なお、上記をダウンロードするためにはDockerHubにメールアドレスを登録してログインする必要があります。

インストールしたらDockerクライアントを立ち上げておきましょう。  
Dockerを使うための準備は以上で完了です。

##Docker立ち上げ用のファイルを用意する

Laravel用のDocker環境として有名なものに[Laradock](https://laradock.io)というものがあります。  
Laradockはドキュメントが充実していて、さらにSymfonyやWordPressなど他のPHPを使った開発環境構築をサポートしているなど、なかなか便利ではあります。

ただ、Laradockは色々なプロジェクトをサポートしている影響でコード量が多くなり管理や設定がめんどうな側面がある上に、  
初回起動に時間が結構かかる（20分くらい待った記憶があります）のがやや難点だと感じています。  

そのため、今回はLaradockは使わずにLaravel専用のコンパクトなDocker環境を用意して使おうと思います。  
Laravelを動かす最低限の環境として、以下の3つのDockerイメージを使い、3つのDockerコンテナを作成します。

- [PHP 7.2 fpm](https://hub.docker.com/_/php)　（PHPの実行環境）
- [MySQL 5.7](https://hub.docker.com/_/mysql)　（DBサーバ）
- [Nginx](https://hub.docker.com/_/nginx)　（Webサーバ）

また、今回用意する環境ではLaravelを使うためにPHPの実行コンテナの中にComposerやNode.jsをインストールしていきます。  
（つまり、端末に直接Composer等のインストールをする必要はありません。Docker便利ですよね。）

なお、今回使用するDockerファイルは[こちら](http://rabbitfoot141.hatenablog.com/entry/2018/08/16/222403)のページを参考にさせていただいて作成しました。

それでは、さっそくLaravel用のDockerファイルをGitからダウンロードしましょう。  
下記のコマンドを入力します。

```bash
$ git clone https://github.com/YopiNoji/docker-for-laravel.git
$ cd docker-for-laravel/
$ rm -rf .git
```

なお、今回はこのまま「docker-for-laravel」というプロジェクトフォルダに環境を構築しますが、作成するアプリによってプロジェクトフォルダの名前は適宜書き換えた方が良いと思います。

##Docker Composeを使い開発環境を立ち上げる

MySQLとNginxとPHPの3つのコンテナを立ち上げます。

プロジェクトフォルダに入ったら、早速環境を立ち上げていきましょう。
環境の立ち上げにはDocker Composeを用います。  
Docker Composeは複数のコンテナを使うDocker環境をYMLファイルに定義することで、それらを連動して起動することができるツールです。

docker-compose.ymlに起動時の処理が定義してあるので、入力するコマンドはたったの１行だけです。

```bash
$ docker-compose up -d --build
```

上手くコンテナが立ち上げっていれば、以下のログが表示されるはずです。  
上から順番にMySQLコンテナ、PHPコンテナ、Nginxコンテナになります。

```bash
Successfully tagged docker-for-laravel_app:latest
Starting docker-for-laravel_db_1 ... done
Creating docker-for-laravel_app_1 ... done
Creating docker-for-laravel_web_1 ... done
```

ローカル環境のポートが既に占有されている場合などは起動しないと思うので、適宜書き換えてください。

起動が完了したら、ちゃんと立ち上がっているのか念のために確認しておきましょう。  
以下のコマンドを実行して、3つコンテナが存在していればOKです。

```bash
$ docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                               NAMES
393ea9dec90e        nginx                    "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:80->80/tcp                  docker-for-laravel_web_1
588739d27992        docker-for-laravel_app   "docker-php-entrypoi…"   4 minutes ago       Up 4 minutes        9000/tcp                            docker-for-laravel_app_1
0d652fa7d142        mysql:5.7                "docker-entrypoint.s…"   7 minutes ago       Up 4 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp   docker-for-laravel_db_1
```

##Docker環境にLaravelをインストールする

さて、ここまでで既にLaravelを動かすための環境は概ね用意できました。  
ただし、肝心のLaravelプロジェクトはまだ存在していない状態なので早速インストールしましょう。

Dockerを立ち上げる際に、PHPのパッケージ管理ツールComposerからlaravel/installerをコンテナにインストールしておいたので、  
下記のコマンドを実行するだけでLaravelを用意できます。

```bash
$ docker-compose exec app laravel new
```

インストール完了後にWebブラウザからlocalhostにアクセスするとLaravelの初期ページが表示されているはずです。

![laravel_default_top](./laravel_default_top.png)

##MySQLにLaravel用のDBを作る

Laravel用に作成したMySQLにDBを作成します。  
MySQLコンテナに入るために以下を入力します。

```bash
$ docker-compose exec db mysql -uroot -ppassword
```

MySQLコンテナに入れたら以下を入力してDBを作成します。

```bash
mysql> create database laravel default character set utf8;
```

DBが作成できたら、Laravelの環境変数を設定してあげて、LaravelからDBにアクセスできるようにしてあげます。
.envにある環境変数の以下の部分を書き換えてあげます。

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=password
```

これでDBのセットアップは完了です。

##試しにDBにマイグレーションしてみる

DBのセットアップが完了したので、試しにLaravelのDBにテーブルを作ってみましょう。  
今回はLaravelセットアップ時ににデフォルトで作成されるマイグレーションファイルを元にしてテーブルを作ってみます。

ひとまず、Laravelが配置してあるコンテナにアクセスします。  
以下のコマンドでアクセスできるはずです。

```bash
$ docker-compose exec app bash
```

Laravelのアプリケーションコンテナにアクセスできたら、マイグレーション実行コマンド（php artisan migrate）を入力してみます。

```bash
root@588739d27992:/var/www/html# php artisan migrate  
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (0.05 seconds)
Migrating: 2014_10_12_100000_create_password_resets_table
Migrated:  2014_10_12_100000_create_password_resets_table (0.02 seconds)
Migrating: 2019_08_19_000000_create_failed_jobs_table
Migrated:  2019_08_19_000000_create_failed_jobs_table (0.01 seconds)
```

DB接続に問題なければ上記の表示になるはずです。

ここまで動くことを確認できれば、あとは好きなようにLaravelを弄って開発していくだけです。  
割と簡単にLaravel開発環境を構築できたのではないでしょうか。


##参考

[「それコンテナにする意味あんの？」迷える子羊に捧げるコンテナ環境徹底比較](https://dev.classmethod.jp/cloud/aws/cmdevio2019-container/)

[docker-compose による nginx + HTTP/2 + PHP-FPM7 + MySQL 環境の構築方法](https://tech.recruit-mp.co.jp/infrastructure/post-12795/)

[Laravelの動く環境をdocker-compose(PHP 7.2 + nginx + MySQL)でいい感じにする](http://rabbitfoot141.hatenablog.com/entry/2018/08/16/222403)
