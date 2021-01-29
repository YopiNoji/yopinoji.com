import React, { ButtonHTMLAttributes } from "react";

export const NormalButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  return (
    <button
      className="flex mx-2 mb-2 py-2 px-12 font-bold bg-gray-50 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-gray-300 border-2 border-black dark:border-gray-300 dark:bg-black dark:hover:bg-white dark:hover:text-gray-700 transition ease-in-out duration-500 gray-300space-nowrap"
      {...props}
    >
      {props.children}
    </button>
  );
};
