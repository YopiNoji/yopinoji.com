import React, { ButtonHTMLAttributes } from "react";

export const NormalButton: React.FC<ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({ ...props }) => {
  return (
    <button
      className="flex mx-2 mb-2 py-2 px-12 font-bold dark:bg-gray-50 dark:text-gray-700 text-gray-300 dark:hover:bg-black dark:hover:text-gray-300 border border-black dark:border-white bg-black hover:bg-white hover:text-gray-700 transition ease-in-out duration-500 whitespace-nowrap"
      {...props}
    >
      {props.children}
    </button>
  );
};
