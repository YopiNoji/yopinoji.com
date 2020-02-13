---
title: "Firebase Functions を使って Nuxt.js 製のサイトにお問い合わせフォームを追加する"
cover: '2019-11-20-create-contact-form-for-nuxt-js-with-firebase-functions/header.png'
category: "Tech"
date: "2019/11/20"
slug: "create-contact-form-for-nuxt-js-with-firebase-functions"
tags:
    - Nuxt.js
    - Firebase
---

[Nuxt.jsとFirebaseを使ったポートフォリオサイトの作り方](/getting-started-with-nuxt-js-and-firebase)について以前解説しましたが、  
そのサイトにFirebase Functionsを使ったお問い合わせフォームを作成したのでその手順です。

## Firebase Functionsとは何か

まず今回使うFirebase Functionsですが、ざっくりと簡単に説明すると「Webサーバ不要なサーバレスのAPIをNode.jsで作れるよ」というものです。

Firebaseの機能のひとつとしてGoogleから提供されています。  
利用する頻度によっては課金が必要になりますが、小規模な個人サイト程度であれば無料で使うことが可能です。

Webサーバ不要なサーバレスでAPIを作れるというとAWSのLambdaとAPI Gatewayの組み合わせもありますが、AWSのように2つのサービスを組み合わせずにAPIが作成できるという点で手軽に利用しやすいと思います。

##Firebase Functionsをさっそく使ってみる

それではさっそく使ってみましょう。  
なお、Firebaseの初期設定やベースとなるサイトについては[以前の記事](/getting-started-with-nuxt-js-and-firebase)を参照してください。

まず最初にFirebase Hostingを使った時と同じように`firebase init`コマンドで設定ファイルを生成します。

```bash
$ npm run firebase init
```

矢印キーとスペースキーでFunctionsを選んで、エンターキーで次に進みます。

```bash

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /Users/yopinoji/Workspace/nuxt-js-portfolio

Before we get started, keep in mind:

  * You are initializing in an existing Firebase project directory

? Which Firebase CLI features do you want to set up for this folder? Press Space
 to select features, then Enter to confirm your choices. 
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
❯◉ Functions: Configure and deploy Cloud Functions
 ◯ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
```

セットアップの際に、「JavaScriptを使うのかTypeScriptを使うのか」「ESLintを使うのか」など色々と聞かれますが、自分の好きなようにしてしまって問題ないです。

```bash
=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? JavaScript
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
? File functions/package.json already exists. Overwrite? Yes
✔  Wrote functions/package.json
? File functions/.eslintrc.json already exists. Overwrite? Yes
? File functions/index.js already exists. Overwrite? Yes
✔  Wrote functions/.eslintrc.json
✔  Wrote functions/index.js
? File functions/.gitignore already exists. Overwrite? Yes
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes
```

セットアップが完了すると作業ディレクトリに`functions`というフォルダができているかと思いますが、そのフォルダがFirebase Functionsの開発で使う作業フォルダになります。

##お問い合わせ内容をメールで転送するAPIを作る

`functions`フォルダにある`index.js`を下記に書き換えてください。

```javascript
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const gmailDestination = functions.config().gmail.destination
const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

exports.sendMail = functions.https.onCall((data, context) => {
  const email = {
    from: gmailEmail,
    to: gmailDestination,
    subject: data.form.subject.contents,
    text:
      data.form.message.contents +
      '\n' +
      'Email:' +
      data.form.email.contents +
      '\n' +
      'Name:' +
      data.form.name.contents
  }
  mailTransport.sendMail(email, (err, info) => {
    if (err) {
      return console.log(err)
    }
    return console.log('success')
  })
})
```

ソースについて軽く解説すると、`nodemailer`というNode.jsでメールを送信するためのnpmパッケージがあるので、  
それを用いてGmailのアカウントを使いお問い合わせ内容をメールで転送します。

GmailアカウントのIDとPasswordはソースに直書きだとまずいので、Firebaseの環境変数として登録しておきます。  
こうすることでFirebaseにログインできない限り、GmailアカウントのIDとPasswordを隠蔽することができます。

環境変数に設定するにはFirebaseの開発環境からCUIでコマンドを入力することで行えます。  
あらかじめログインしておく必要があるので、ログインがまだの場合は前回の記事を参考にしてログインしてみてください。

環境変数への設定は以下のコマンドで行います。  
`gmail.email`と`gmail.password`にはメール転送に使うGmailアカウントの情報を、`gmail.destination`にはメールの転送先のメールアドレスを入れます。

```
$ npm run firebase functions:config:set gmail.email="from@gmail.com" gmail.password="yourpassword" gmail.destination="to@gmail.com"
```

ここで気をつけて欲しいのが、メール転送に使うGmailアカウントはFirebaseのAPIからログインする都合でGoogleアカウントのセキュリティレベルを落とさざるを得ません。  
そのため、この方法を使う場合、転送専用のGmailアカウントを使うことをお勧めします。  
なお、転送されたメールを受信する側についてはセキュリティレベルを下げる必要はないので、こちらは普段使っているメールアドレスで問題ないです。

環境変数への設定ができたら、ちゃんと設定できているのか確認しておきましょう。  
Firebase Functionsの環境変数を取得するには、以下のコマンドを実行します。

```bash
$ npm run firebase functions:config:get
```

設定に問題なければ以下のようなJSON形式で環境変数が返ってきます。

```json
{
  "gmail": {
    "email": "from@gmail.com",
    "password": "yourpassword",
    "destination": "to@gmail.com"
  }
}
```

最後に依存ライブラリ（nodemailer）をインストールしておきます。

```bash
$ npm install nodemailer
```

これでFirebase Functionsを使い、お問い合わせ内容をメールで転送するAPIの作成はほぼ完成です。

## Nuxt.jsでFirebase Functionsを使う画面を作る

次はAPIにお問い合わせ内容を送るための画面をNuxt.js(Vue.js)で作っていきます。

画面を作る前に、Nuxt.jsアプリからFirebase Functionsを簡単に利用するための設定ファイルを作っていきます。

まず、Nuxt.jsで`.env`を使えるようにするためのライブラリをインストールします。

```
$ npm install @nuxtjs/dotenv
```

ついでに、FirebaseにNuxt.jsアプリから簡単にアクセスするためのライブラリをインストールしておきます。

```
$ npm install firebase
```

Nuxt.jsで`.env`を使うためのライブラリをインストールできたら、`nuxt.config.js`に以下2つ記載を追記してあげます。

```
plugins: [
  '~/plugins/firebase.js'
]
```

```
modules: [
  '@nuxtjs/dotenv'
]
```

次に、Nuxt.jsプロジェクトの`plugins`フォルダに`firebase.js`を作成します。

```javascript
import firebase from 'firebase'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
```

最後に、上記の`firebase.js`で使用する`.env`を作成します。  
雛形は以下を使ってください。

```env
FB_API_KEY = ''
FB_AUTH_DOMAIN = ''
FB_DATABASE_URL = ''
FB_PROJECTID = ''
FB_STORAGE_BUCKET = ''
FB_MESSAGING_SENDER_ID = ''
```

「APIのキーなどはどこから取得できるのか」という件については、Firebaseから取得する必要があります。

![firebase-setting-before-create-app](./firebase-setting-before-create-app.png)

上記のFirebaseプロジェクトの設定画面に行くと、「プロジェクトにはまだアプリがありません」と出ている箇所があります。

Firebase Hostingだけの利用だとここにアプリを作成する必要はなかったのですが、  
Firebase Functionsなどを使う際にFirebaseのnpmライブラリを使う場合はここでアプリを作成する必要があるみたいです。

そのため、アプリを作成してあげてください。
なお、アプリを作成する際にFirebase Toolsのインストールなど色々出てきますが、[以前の記事](/getting-started-with-nuxt-js-and-firebase)から続けている方は既に設定済みなので読み飛ばしてしまって問題ありません。

![firebase-setting-after-create-app](./firebase-setting-after-create-app.png)

アプリを作成すると上記のようにキー情報が入手できるので、これを先ほどの`.env`に貼ってください。

さて、Nuxt.js側の設定が一通り終わったら、画面を作っていきます。  
お問い合わせフォームは以下のようなコンポーネントにします。

```javascript
<template>
  <div class="contact">
    <form>
      <div class="contact-form">
        <input
          v-model="form.name.contents"
          class="contact-form-text"
          type="text"
          placeholder=""
        />
        <label class="contact-form-label">Name</label>
      </div>
      <div class="contact-form">
        <input
          v-model="form.organization.contents"
          class="contact-form-text"
          type="text"
          placeholder=""
        />
        <label class="contact-form-label">Organization</label>
      </div>
      <div class="contact-form">
        <input
          v-model="form.email.contents"
          class="contact-form-text"
          type="email"
          placeholder=""
        />
        <label class="contact-form-label">Email</label>
      </div>
      <div class="contact-form">
        <input
          v-model="form.subject.contents"
          class="contact-form-text"
          type="text"
          placeholder=""
        />
        <label class="contact-form-label">Subject</label>
      </div>
      <div class="contact-form">
        <textarea
          v-model="form.message.contents"
          class="contact-form-textarea"
          type="textarea"
          placeholder=""
        />
        <label class="contact-form-label">Message</label>
      </div>
      <div class="contact-form">
        <button class="contact-form-button" type="button" @click="sendMail()">
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  data: () => ({
    form: {
      name: { contents: '' },
      organization: { contents: '' },
      email: { contents: '' },
      subject: { contents: '' },
      message: { contents: '' }
    }
  }),
  methods: {
    sendMail() {
      const form = this.form
      const sendMail = firebase.functions().httpsCallable('sendMail')
      sendMail({ form })
        .then((response) => {
          alert(response)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped></style>
```

お問い合わせ内容をシンプルに送信するだけのフォームです。  
送信前のバリデーションは行っていませんが、もし必要であれば自分のGitHubにあるソースを参考にして追加してください。

##実際に動かして確認する

最後に、作成したお問い合わせフォームを実際に確認します。

```bash
$ npm run generate
```

```bash
$ npm run firebase deploy
```

実際にデプロイしてお問い合わせフォームを動かして問題なければ完了です。

もし、お問い合わせフォームが動かないなど問題がある場合、ログを見ながら進めると解決できると思います。
ログについては、FirebaseのWeb上から確認することができます。  

![firebase-log](./firebase-log.png)

お問い合わせ送信用のAPIにログ関数を仕込んで色々と試してみてください。

## 終わりに

Webサーバを用いないサーバレスの構成で、ここまで実装を行うことができるFirebaseは本当に便利です。  
Firebase上の他のサービスも活用することでもっと深いところまで作れると思うので、是非試してみてください。

## 参考

[Firebase　公式](https://firebase.google.com)


