import React, { HtmlHTMLAttributes } from "react";

interface BadgeProps {
  bgColor?: string;
}

export const Badge: React.FC<
  HtmlHTMLAttributes<HTMLHeadElement> & BadgeProps
> = ({ bgColor, ...props }) => {
  return (
    <label
      className={`px-1 mx-1 text-sm text-gray-900 no-underline border border-gray-700 rounded whitespace-nowrap ${
        bgColor ? bgColor : "bg-white"
      }`}
      {...props}
    >
      {props.children}
    </label>
  );
};
