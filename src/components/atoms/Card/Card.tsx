import React, { HtmlHTMLAttributes } from "react";

export const Card: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <div
      className="rounded overflow-hidden shadow-md m-2 p-2 transition duration-500 ease-in-out hover:shadow-2xl dark:bg-black"
      {...props}
    >
      {props.children}
    </div>
  );
};
