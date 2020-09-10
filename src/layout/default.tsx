import React from "react"
import Header from './Header'
import Footer from './Footer'

type PropsType = {
    children: React.ReactNode;
}
  
const Layout: React.FC<PropsType> = props => {
  return (
    <div className="min-h-screen m-12">
      <Header />
      <div className="container max-w-md mx-auto my-12">
        {props.children} 
      </div>
      <Footer />
    </div>
  )
}

export default Layout
