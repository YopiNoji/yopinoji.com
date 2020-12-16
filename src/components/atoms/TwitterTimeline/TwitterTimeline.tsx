import React, { useEffect } from "react";

interface TwitterTimelineProps {
  twitterId?: string;
}

export const TwitterTimeline: React.FC<TwitterTimelineProps> = ({
  twitterId,
  ...props
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const s = document.createElement("script");
      s.setAttribute("src", "https://platform.twitter.com/widgets.js");
      document.body.appendChild(s);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <a
      className="twitter-timeline"
      data-lang="en"
      data-width="300"
      data-height="200"
      href={"https://twitter.com/" + twitterId}
      {...props}
    >
      Tweets by {twitterId}
    </a>
  );
};
