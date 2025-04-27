import React from 'react'

const Header = () => {
  return (
    <div className='menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box font-size:100rem'>
      <li className='mr-4 bg-base-200 p-4 rounded text-lg'><a href='/'>Home</a></li>
      <li className='mr-4 bg-base-200 p-4 rounded text-lg'><a>About</a></li>
      <li className='mr-4 bg-base-200 p-4 rounded text-lg'><a>Contact</a></li>
    </div>
  )
}
export default Header
