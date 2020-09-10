import { Link } from "gatsby"
import React from "react"

const Header: React.FC = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20">
      <Link to="/">
        <p className="hover:underline">Blog.</p>
      </Link>
    </h2>
  )
}

export default Header
