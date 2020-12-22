import React from "react";
import { useSpring, animated } from "react-spring";

const scrollTop = (): number => {
  return Math.round(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100
  );
};
const Base: React.VFC = () => {
  React.useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });
  const onScroll = () => {
    const position = scrollTop();
    setSpring({ height: `${position}%` });
  };
  const [springProps, setSpring] = useSpring(() => ({ height: `1%` }));
  return (
    <animated.div
      className="fixed w-6 top-0 right-6 bg-green-300 dark:bg-red-700"
      style={springProps}
    />
  );
};

export default Base;
