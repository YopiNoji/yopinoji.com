import React from "react";
import { NormalButton } from "@Components/atoms/Button";
import { BoldText } from "@Components/atoms/Typography";
import { TwitterTimeline } from "@Components/atoms/TwitterTimeline";

interface FooterProps {
  twitterId?: string | null;
  copyright?: string | null;
}

const Footer: React.FC<FooterProps> = ({ twitterId, copyright }) => {
  const [isTop, setIsTop] = React.useState(true);
  React.useEffect(() => {
    setIsTop(window.location.pathname === "/");
  }, []);
  const moveToTop = () => {
    window.location.href = window.location.origin;
  };
  console.log(twitterId);

  return (
    <footer>
      <div className="py-28 flex flex-col items-center">
        {!isTop && (
          <NormalButton onClick={moveToTop}>Back to Top.</NormalButton>
        )}
        {twitterId && <TwitterTimeline twitterId={twitterId} />}
        {copyright && <BoldText>{copyright}</BoldText>}
      </div>
    </footer>
  );
};

export default Footer;
