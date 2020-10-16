---
title: "ブログのホスティングサービスを Netlify から Vercel に移行した話"
cover: "2020-10-18-migrate-blog-hosting-from-netlify-to-vercel/header.png"
category: "Tech"
date: "2020-10-18"
slug: "migrate-blog-hosting-from-netlify-to-vercel"
tags:
  - Netlify
  - Vercel
  - JAMstack
---

![Google PageSpeed Insight Score](./Google_PageSpeed_Insight_score_20201016.png)

上の画像は 2020 年 10 月現在の当サイトの Google PageSpeed Insight でのスコアです。

一見すると良さそうに見えますが、たまにアクセスするまで時間が少しかかることがあって気になっていました。

![Google PageSpeed Insight Server](./Google_PageSpeed_Insight_server_problem_20201016.png)

原因はおそらくこれです。  
サイトのスコアは満点だったのですが、サーバーの応答速度が遅いと出ていました。

当サイトはサイトの描画に Web サーバを用いておらず、生成した静的サイトをホスティングしているだけの構造、いわゆる JAMstack よりのアーキテクチャを採用しています。

なので応答速度に問題があるとしたらサイトをホスティングしている Netlify の CDN からの応答速度に問題があるのではないかと考えました。

そこでネット上を色々と Netlify に関する情報を調べていきました。  
そしたら、どうやら日本からだと Netlify から応答が返るまでに時間がかかるという情報がいくつか見受けられました。

- [Netlify が日本からだと遅い](https://blog.anatoo.jp/2020-08-03)
- [Netlify の表示スピードがいまいちパフォーマンスを発揮できていない件](https://scrapbox.io/meganii/Netlify%E3%81%AE%E8%A1%A8%E7%A4%BA%E3%82%B9%E3%83%94%E3%83%BC%E3%83%89%E3%81%8C%E3%81%84%E3%81%BE%E3%81%84%E3%81%A1%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%82%92%E7%99%BA%E6%8F%AE%E3%81%A7%E3%81%8D%E3%81%A6%E3%81%84%E3%81%AA%E3%81%84%E4%BB%B6)

どうやら執筆している現在の Netlify は日本国内に CDN がないため、日本だとレスポンスが返るまで時間がかかってしまう傾向があるようです。

そこでホスティングサービスの移行先を探すことにしました。

## Netlify からの移行先の候補

静的サイトのホスティングサービスとしてすぐに思いついたのは以下でした。

- AWS
- Firebase
- Vercel

AWS は S3 や Cloudfront を使うことで静的サイトの高速配信が可能で、なおかつ業務での使った経験もあったのですが、金銭的な運用コストを考えると真っ先に外れました。

Firebase についても業務での使用経験があり、なおかつ GitHub Actions を用いた自動デプロイ環境の構築をしたことがありました。

ただ、自分が選んだのは Vercel でした。

### Vercel を選んだ理由
