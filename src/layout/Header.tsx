import { Link } from "gatsby"
import React from "react"

const Header: React.FC = () => {
  return (
    <h2 className="text-5xl font-bold tracking-tight leading-tight mb-12">
      <Link to="/">
        <p className="hover:underline">Blog.</p>
      </Link>
    </h2>
  )
}

export default Header
