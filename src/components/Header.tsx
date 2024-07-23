import Link from 'next/link'
import React from 'react'

const Header = ({ children }: HeaderProps) => {
  return (
    <div className='header'>
      <Link href={'/'}></Link>
    </div>
  )
}

export default Header
