import React, { HtmlHTMLAttributes } from "react";

export const BaseText: React.FC<HtmlHTMLAttributes<HTMLParagraphElement>> = ({
  ...props
}) => {
  return (
    <p
      className="text-base text-gray-900 no-underline dark:text-gray-200"
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
      className="text-sm text-gray-900 no-underline dark:text-gray-200"
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
    <p className="text-base font-bold" {...props}>
      {props.children}
    </p>
  );
};
