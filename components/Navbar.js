import React from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const Navbar = () => {
  return (
    <div className='w-full font-Poppins flex justify-between'>
        <div className=' pl-4 pt-4 '>
            <FormatListBulletedIcon style={{color:"red",fontSize:"40px"}}/>
        </div>
        <div className='flex gap-3 pr-4 pt-4'>
            <button className='w-28 h-10 bg-red-500 text-whtie font-Poppins '>Sign In</button>
        </div>
    </div>
  )
}

export default Navbar