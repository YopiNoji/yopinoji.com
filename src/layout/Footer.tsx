import React from 'react'
import { NormalButton } from '@Components/atoms/Button'

const Footer: React.FC = () => {
  const moveToProfile = () => {
    const url = 'https://yopinoji.info'
    window.open(url, '_blank')
  }
  const moveToGitHub = () => {
    const url = 'https://github.com/yopinoji/yopinoji.com'
    window.open(url, '_blank')
  }


  return (
    <footer>
        <div className="py-28 flex flex-col items-center">
            <NormalButton onClick={moveToProfile}>View Author&apos;s Profile</NormalButton>
            <NormalButton onClick={moveToGitHub}>View on GitHub</NormalButton>
            <div className="mx-2 mb-2 text-sm font-bold tracking-tighter leading-tight text-center">
              © YopiNoji. All Rights Reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer
