import { Link } from "gatsby"
import React from "react"

const Header: React.FC = () => {
  return (
    <h2 className="text-5xl font-bold tracking-tight leading-tight mb-12">
      <Link to="/">
        <p className="transition duration-700 ease-in-out text-black hover:text-opacity-50">Blog.</p>
      </Link>
    </h2>
  )
}

export default Header
