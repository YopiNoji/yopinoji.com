import React, { Component } from "react";
import UserLinks from "../UserLinks/UserLinks";
import UserInfo from "..//UserInfo/UserInfo";
import Image from "../Image/Image";
import "./About.css";

class About extends Component {
  render() {
    const { config } = this.props;
    return (
      <div className="about">
        <h1>About</h1>
        <div className="profile">
          <h2>プロフィール</h2>
          <div className="profile-photo">
            <Image filename={"wanisan.png"} />
          </div>
          <div className="profile-list">
            <p>名前：よぴのじ</p>
            <p>年齢：２０代</p>
            <p>職業：エンジニア</p>
            <p>好きなもの：技術、猫、スポーツ観戦、ゲーム</p>
            <p>苦手なもの：虫、朝起きること</p>
            <p>住所：東京/日本</p>
            <p>連絡先：<a href="https://twitter.com/YopiNoji" target="_blank">TwitterのDM</a>または<a href="https://yopinoji.info/contact" target="_blank">こちらのContactページ</a>へ</p>
            <UserInfo config={config} />
          </div>
        </div>
        <div className="site-infos">
          <div className="infos">
            <h2>当サイトについて</h2>
            <p>個人ブログです。</p>
            <p>プログラミングや技術など興味のある分野について書いています。</p>
            <h2>免責事項について</h2>
            <p>当サイトに掲載されている情報の正確性については万全を期しておりますが、</p>
            <p>当サイトの情報を用いて行う一切の行為について、何らの責任を負うものではありませんのでご了承ください。</p>
            <p>なお、上記に起因して利用者に生じた損害について、当サイトとしては責任を負いかねますので御了承ください。</p>
            <p>また、当サイト内で誤った情報を見つけた場合は<a href="https://twitter.com/YopiNoji" target="_blank">TwitterのDM</a>でご連絡いただけますと幸いです。</p>
          </div>
        </div>
        {/* <UserLinks config={config} labeled /> */}
      </div>
    );
  }
}

export default About;
