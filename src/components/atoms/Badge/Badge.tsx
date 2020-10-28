import React, { HtmlHTMLAttributes } from "react"

export const Badge: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({...props}) => {
  return <label className="px-1 text-sm bg-teal-300 text-gray-700 rounded" {...props}>{props.children}</label>
}
