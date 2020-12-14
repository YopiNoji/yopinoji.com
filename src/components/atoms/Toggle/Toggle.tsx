import React, { useState } from "react";

interface ToggleProps {
  onChange?: (v: boolean) => void;
  text?: string;
}

const Toggle: React.FC<ToggleProps> = ({ onChange, text, ...props }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center justify-center w-full m-2" {...props}>
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            onChange={() => {
              setChecked(!checked);
              onChange && onChange(checked);
            }}
          />
          <div
            className={`w-8 h-4 bg-gray-400 rounded-full shadow-inner ${
              checked && "bg-green-50"
            }`}
          ></div>
          <div
            className={`absolute w-4 h-4 bg-gray-50 rounded-full shadow inset-y-0 left-0 transition-transform transform ${
              checked && "translate-x-full bg-green-300"
            }`}
          ></div>
        </div>
        <div className="ml-3 text-gray-900 font-medium">{text}</div>
      </label>
    </div>
  );
};

export default Toggle;
