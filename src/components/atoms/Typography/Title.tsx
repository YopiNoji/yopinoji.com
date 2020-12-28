import React, { HTMLAttributes } from "react";

export const H1: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h1
      className="text-3xl font-bold text-gray-700 no-underline dark:text-gray-300"
      {...props}
    >
      {props.children}
    </h1>
  );
};

export const H2: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h2
      className="text-2xl no-underline text-gray-700 dark:text-gray-300"
      {...props}
    >
      {props.children}
    </h2>
  );
};

export const H3: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h3
      className="text-xl text-gray-700 no-underline dark:text-gray-300"
      {...props}
    >
      {props.children}
    </h3>
  );
};
