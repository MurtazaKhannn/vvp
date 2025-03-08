import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[10vh] w-full flex items-center justify-between p-10  shadow-2xl'>
        <div>
            <img src="/vvpLogo.png" className='size-10' alt="" />
        </div>
      <div className='flex gap-4 font-semibold'>
        <div>Home</div>
        <div>About Us</div>
        <div>Courses</div>
        <div>Gallery</div>
        <div>Shop</div>
        <div>Contents</div>
      </div>
    </div>
  )
}

export default Navbar
