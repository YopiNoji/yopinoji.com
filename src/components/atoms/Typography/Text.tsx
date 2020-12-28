import React, { HtmlHTMLAttributes } from "react";

export const BaseText: React.FC<HtmlHTMLAttributes<HTMLParagraphElement>> = ({
  ...props
}) => {
  return (
    <p
      className="text-base text-gray-700 no-underline dark:text-gray-300"
      {...props}
    >
      {props.children}
    </p>
  );
};

export const SmallText: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({
  ...props
}) => {
  return (
    <p
      className="text-sm no-underline text-gray-700 dark:text-gray-300"
      {...props}
    >
      {props.children}
    </p>
  );
};

export const BoldText: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({
  ...props
}) => {
  return (
    <p className="text-base font-bold dark:text-gray-300" {...props}>
      {props.children}
    </p>
  );
};
