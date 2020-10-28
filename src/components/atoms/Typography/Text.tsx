import React, { HtmlHTMLAttributes } from "react"

export const BaseText: React.FC<HtmlHTMLAttributes<HTMLParagraphElement>> = ({...props}) => {
  return <span className="text-base" {...props}>{props.children}</span>
}

export const SmallText: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({...props}) => {
  return <span className="text-sm" {...props}>{props.children}</span>
}
