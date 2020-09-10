import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer>
        <div className="py-28 flex flex-col items-center">
            <a
              href={`https://yopinoji.info`}
              className="mx-2 mb-2 py-2 px-12 bg-black hover:bg-white hover:text-black border border-black text-white font-bold duration-200 transition-colors"
            >
              View Author&apos;s Profile
            </a>
            <a
              href={`https://github.com/yopinoji/yopinoji.com`}
              className="mx-2 mb-2 py-2 px-12 border border-black font-bold hover:underline"
            >
              View on GitHub
            </a>
            <div className="mx-2 mb-2 text-sm font-bold tracking-tighter leading-tight text-center">
              © YopiNoji. All Rights Reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer
