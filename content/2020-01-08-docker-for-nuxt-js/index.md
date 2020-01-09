---
title: "Nuxt.jsのプロジェクトをDocker(Docker Compose)を使って動かす"
cover: '2020-01-08-docker-for-nuxt-js/header.png'
category: "Tech"
date: "2020-01-08"
slug: "docker-for-nuxt-js"
tags:
    - Nuxt.js
    - Docker
---

前回の記事の続きみたいな感じです。  
開発環境を動かすためにNode.jsが必要なプロジェクトを全てDocker化したかったので、  
Nuxt.jsで動かしているポートフォリオサイトもDocker化しました。

## オレオレDocker環境の紹介

Dockerとは何ぞやということについては解説を省きます。

今回は`Dockerfile`と`docker-compose.yml`の２つをNuxt.jsプロジェクト直下に配置して、Nuxt.jsプロジェクトをDocker化します。

Docker Composeは複数のコンテナを使うDocker環境をYMLファイルに定義することで、それらを連動して起動することができるツールです。  
今回の例はコンテナを複数使う訳ではないですが、Docker Composeを使うとコマンド１つで起動できて楽なので使います。

### docker-compose.yml

```yml
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    command: npm run dev
    volumes:
      - /usr/src/node_modules
      - .:/usr/src
    environment:
      - NODE_ENV=development
```

まずは`docker-compose.yml`の紹介です。

Dockerコンテナ内部の`/usr/src/`フォルダでNuxt.jsを動かす算段です。  
3000番のポートを解放して、PCから[localhost:3000](http://localhost:3000)にアクセスすることでサイトを確認できるようにしてあります。

Docker Composeを動かした際に、`npm run dev`コマンドをコンテナ内で実行します。  

### Dockerfile

```Dockerfile
FROM node:10.14.1-alpine
EXPOSE 3000
ENV HOST 0.0.0.0

WORKDIR /usr/src
COPY ./package.json .
RUN npm install \
    && npm cache clean --force
# CMD ["npm", "run", "dev"]
```

次は`Dockerfile`の紹介です。

Linuxディストリビューションは、ファイルの軽量さに定評のあるAlpine Linuxを用います。  
ただ、Node.jsのバージョンが最新のDockerイメージを使うと、依存関係にあるプログラム（`node-gyp`）が動作しないので、  
Node.jsのバージョンは指定しています。

その後、`package.json`をDockerコンテナにコピーして、それを元に依存性パッケージをインストールして、Nuxt.jsプロジェクトをコピーします。

Docker Compose側で`npm run dev`のコマンドは実行してあげているので、最後の行はコメントアウトしています。  
Docker Composeを使わない時は、ここでコマンド実行してあげることでコンテナを起動したままにします。

### .dockerignore

```.dockerignore
node_modules
.nuxt
```

最後に`.dockerignore`の紹介です。  
こいつは無くても動くはずです。  
ただ、ビルド時間の短縮には繋がるはずです。

### Docker起動

さて、上で紹介した`Dockerfile`と`docker-compose.yml`と`.dockerignore`をNuxt.jsプロジェクト配下に配置しましょう。

配置したら下記のコマンドを入力します。

```bash
docker-compose up -d --build
```

初回はビルドに時間が少しかかりますが、問題なく動くはずです。

コンテナが起動したら[localhost:3000](http://localhost:3000)にアクセスします。  
問題なくNuxt.jsブログが動いていれば問題ありません。

### トラブルシューティング

#### Nuxt.jsをDocker化したタイミングでcore-js関連のエラーが出るようになった

```
These dependencies were not found:

* core-js/modules/es6.array.find in ./.nuxt/client.js
* core-js/modules/es6.array.iterator in ./.nuxt/client.js
* core-js/modules/es6.date.to-string in ./.nuxt/utils.js, ./.nuxt/components/nuxt.js
* core-js/modules/es6.function.name in ./.nuxt/utils.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ContactForm.vue?vue&type=script&lang=js&
* core-js/modules/es6.object.assign in ./.nuxt/client.js
* core-js/modules/es6.object.keys in ./.nuxt/client.js
* core-js/modules/es6.object.to-string in ./.nuxt/utils.js, ./.nuxt/components/nuxt-link.client.js and 1 other
* core-js/modules/es6.promise in ./.nuxt/client.js
* core-js/modules/es6.regexp.constructor in ./.nuxt/utils.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ContactForm.vue?vue&type=script&lang=js&
* core-js/modules/es6.regexp.match in ./.nuxt/client.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ContactForm.vue?vue&type=script&lang=js&
* core-js/modules/es6.regexp.replace in ./.nuxt/utils.js, ./.nuxt/components/nuxt.js
* core-js/modules/es6.regexp.search in ./.nuxt/utils.js
* core-js/modules/es6.regexp.split in ./.nuxt/utils.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-build-indicator.vue?vue&type=script&lang=js&
* core-js/modules/es6.regexp.to-string in ./.nuxt/utils.js, ./.nuxt/components/nuxt.js
* core-js/modules/es6.string.includes in ./.nuxt/client.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/es6.string.iterator in ./.nuxt/App.js
* core-js/modules/es6.string.repeat in ./.nuxt/utils.js
* core-js/modules/es6.string.starts-with in ./.nuxt/utils.js
* core-js/modules/es6.symbol in ./.nuxt/utils.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/es7.array.includes in ./.nuxt/client.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/es7.object.get-own-property-descriptors in ./.nuxt/index.js
* core-js/modules/es7.promise.finally in ./.nuxt/client.js
* core-js/modules/es7.symbol.async-iterator in ./.nuxt/axios.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/web.dom.iterable in ./.nuxt/axios.js, ./.nuxt/components/nuxt-link.client.js
```

どうやらnpmの依存関係に`core-js`のバージョン3系がインストールされているとエラーが起こるようです。

`core-js`自体はバージョン2系のメンテナンスを終了しちゃってるみたいなので、  
本当はインストールしたくないのですが、渋々`core-js`のバージョン2系をインストールします。

```
npm i --save core-js@2
```

インストール後に再度開発環境を起動したところエラーが起こらなくなりました。
