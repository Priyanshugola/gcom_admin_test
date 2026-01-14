import React from 'react'
import {Assets} from '../assets/Assets'
export default function Navbar({settoken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' style={{height: '80px',width: '80px'}} src={Assets.logo} />
      <button onClick={()=>settoken('')} className='bg-gray-600 text-white px-5 py-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>logout</button>
    </div>
  )
}
