import React, { HtmlHTMLAttributes } from "react"

export const Card: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({...props}) => {
  return <div className="rounded overflow-hidden shadow-lg m-2 p-2 transition duration-500 ease-in-out hover:bg-black hover:text-white" {...props}>{props.children}</div>
}
