import React, { HtmlHTMLAttributes } from "react";

export const Twitter: React.FC<HtmlHTMLAttributes<HTMLAnchorElement>> = ({
  ...props
}) => {
  React.useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.body.appendChild(s);
  }, []);
  return (
    <a
      className="twitter-timeline"
      data-lang="en"
      data-width="300"
      data-height="200"
      href="https://twitter.com/YopiNoji"
      {...props}
    >
      Tweets by YopiNoji
    </a>
  );
};
