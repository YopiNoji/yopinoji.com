---
title: "GatsbyJS製のブログをDocker(Docker Compose)を使って動かす"
cover: '2020-01-06-docker-for-gatsby-js/header.png'
category: "Tech"
date: "2020-01-06"
slug: "docker-for-gatsby-js"
tags:
    - GatsbyJS
    - Docker
---

年末年始にPCのクリーンインストールを行い、思い切ってPCを購入時の真っ白な状態に戻したのですが、  
その時に**「わざわざNode.jsをPCのインストールしなくてもDockerでNode.jsを動かせる環境を作ればよくない？」**とふと思い、  
当ブログの開発環境もDocker化したのでその記録です。


## オレオレDocker環境の紹介

今回は`Dockerfile`と`docker-compose.yml`の２つをGatsbyJSプロジェクト直下に配置して、GatsbyJSプロジェクトをDocker化します。

Docker Composeは複数のコンテナを使うDocker環境をYMLファイルに定義することで、それらを連動して起動することができるツールです。  
今回はコンテナを複数使う訳ではないですが、Docker Composeを使うとコマンド１つで起動できて楽なので使います。

それじゃ、**いかれた仲間を紹介するぜ！**

### docker-compose.yml

```yml
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - /app/node_modules
      - .:/app
    environment:
      - NODE_ENV=development
```

まずは`docker-compose.yml`だ！

とてもシンプルな構成かと思います。

Dockerコンテナ内部の`/app`フォルダでGatsbyJSを動かす算段です。  
8000番のポートを解放して、PCから[localhost:8000](http://localhost:8000)にアクセスすることでサイトを確認できるようにしてあります。

### Dockerfile

```Dockerfile
FROM node:alpine
EXPOSE 8000

RUN \
  apk add --no-cache python make g++ && \
  apk add vips-dev fftw-dev --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community --repository http://dl-3.alpinelinux.org/alpine/edge/main && \
  rm -fR /var/cache/apk/*

WORKDIR /app
COPY ./package.json .
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "run", "develop", "--", "--host", "0.0.0.0" ]
```

次は`Dockerfile`の紹介だ！

Linuxディストリビューションは、ファイルの軽量さに定評のあるAlpine Linuxを用います。  
Alpine Linuxを用いる際の注意点として、npmの`sharp`モジュールを動かすために`vips-dev`などのインストールが別途必要になります。  
こいつのインストールも`Dockerfile`に定義します。

その後、`package.json`をDockerコンテナにコピーして、それを元に依存性パッケージをインストールして、GatsbyJSプロジェクトをコピーします。

最後に、`--host 0.0.0.0`を指定して開発環境を立ち上げるだけです。

### .dockerignore

```.dockerignore
node_modules
```

最後に`.dockerignore`の紹介です。  
こいつは無くても動くはずです。
ただ、ブラックホールより重いことに定評のある`node_modules`をコンテナにコピーするのは気が引けるので、一応用意します。

![heaviest_objects_in_the_universe](./heaviest_objects_in_the_universe.jpg)

### Docker起動

さて、上で紹介した`Dockerfile`と`docker-compose.yml`と`.dockerignore`をGatsbyJSプロジェクト配下に配置しましょう。

配置したら下記のコマンドを入力します。

```bash
docker-compose up -d --build
```

初回はビルドに時間が少しかかりますが、問題なく動くはずです。  
もし、動かない場合はご連絡いただければ幸いです。

コンテナが起動したら[localhost:8000](http://localhost:8000)にアクセスします。  
問題なくGatsbyJSブログが動いていれば問題ありません。

## 最後に

開発環境をDocker化することで、わざわざ自分のPCにNode.jsやらをインストールする呪縛から解放されました！
やったね！
