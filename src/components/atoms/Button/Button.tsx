import React, { HtmlHTMLAttributes } from "react";

export const NormalButton: React.FC<HtmlHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button
      className="flex mx-2 mb-2 py-2 px-12 border border-black font-bold hover:bg-black transition duration-500 ease-in-out hover:text-white duration-200 transition-colors whitespace-nowrap"
      {...props}
    >
      {props.children}
    </button>
  );
};
