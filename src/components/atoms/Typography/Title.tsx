import React, { HtmlHTMLAttributes } from "react";

export const H1: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({
  ...props
}) => {
  return (
    <h1 className="text-3xl font-bold " {...props}>
      {props.children}
    </h1>
  );
};

export const H2: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({
  ...props
}) => {
  return (
    <h2 className="text-2xl" {...props}>
      {props.children}
    </h2>
  );
};

export const H3: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({
  ...props
}) => {
  return (
    <h3 className="text-xl" {...props}>
      {props.children}
    </h3>
  );
};
