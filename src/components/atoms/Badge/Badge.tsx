import React, { HtmlHTMLAttributes } from "react";

interface BadgeProps {
  bgColor?: string;
}

export const Badge: React.FC<
  HtmlHTMLAttributes<HTMLHeadElement> & BadgeProps
> = ({ bgColor, ...props }) => {
  return (
    <label
      className={`px-1 m-1 text-sm text-gray-900 no-underline border border-black dark:border-gray-50 rounded whitespace-nowrap ${
        bgColor ? bgColor : "bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
      }`}
      {...props}
    >
      {props.children}
    </label>
  );
};
