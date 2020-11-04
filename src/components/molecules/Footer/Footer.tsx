import React from "react";
import { NormalButton } from "@Components/atoms/Button";
import { BoldText } from "@Components/atoms/Typography";
import { TwitterTimeline } from "@Components/atoms/TwitterTimeline";

const Footer: React.FC = () => {
  const [isTop, setIsTop] = React.useState(true);
  React.useEffect(() => {
    setIsTop(window.location.pathname === "/");
  }, []);
  const moveToTop = () => {
    window.location.href = window.location.origin;
  };

  return (
    <footer>
      <div className="py-28 flex flex-col items-center">
        {!isTop && (
          <NormalButton onClick={moveToTop}>Back to Top.</NormalButton>
        )}
        <TwitterTimeline />
        <BoldText>{"© YopiNoji. All Rights Reserved."}</BoldText>
      </div>
    </footer>
  );
};

export default Footer;
