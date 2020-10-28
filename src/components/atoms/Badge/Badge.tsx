import React, { HtmlHTMLAttributes } from "react"

interface BadgeProps {
  bgColor?: string;
}

export const Badge: React.FC<HtmlHTMLAttributes<HTMLHeadElement> & BadgeProps> = ({bgColor , ...props}) => {
  return <label className={`px-1 mx-1 text-sm text-gray-800 rounded whitespace-no-wrap ${ bgColor ? bgColor : "bg-teal-200" }`} {...props}>{props.children}</label>
}
