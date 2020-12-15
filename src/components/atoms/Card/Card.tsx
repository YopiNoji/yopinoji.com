import React, { HTMLAttributes } from "react";

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const className =
    " border rounded overflow-hidden shadow-md m-2 p-2 transition duration-500 ease-in-out hover:shadow-2xl dark:bg-black dark:border-red-500";
  return (
    <div {...props} className={props.className + className}>
      {props.children}
    </div>
  );
};
