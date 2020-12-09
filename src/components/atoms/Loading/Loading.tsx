import React from "react";
import { useSpring, animated } from "react-spring";

const interp = (i: number) => (r: number) =>
  `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

const Loading: React.VFC = () => {
  const props = useSpring({
    to: async (next) => {
      while (next) await next({ radians: 2 * Math.PI });
    },
    from: { radians: 0 },
    config: { duration: 3500 },
    reset: true,
  });
  return (
    <div className="flex m-2">
      {[...Array(10).keys()].map((i) => (
        <animated.div
          key={i}
          className="w-2 h-12 bg-black mx-2"
          style={{ transform: props.radians.interpolate(interp(i)) }}
        />
      ))}
    </div>
  );
};

export default Loading;
