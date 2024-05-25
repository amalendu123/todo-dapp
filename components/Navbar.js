import React, { useContext } from 'react'
import { taskContext } from '@/Context/task';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(taskContext);
  
  return (
    <div className='w-full font-Poppins flex justify-between'>
        <div className=' pl-4 pt-4 '>
            <FormatListBulletedIcon style={{color:"red",fontSize:"40px"}}/>
        </div>
        <div className='flex gap-3 pr-4 pt-4'>
            <button className='w-fit h-10 bg-red-500 text-whtie font-Poppins p-2 ' onClick={connectWallet}>{currentAccount ? currentAccount : "Sign In"}</button>
        </div>
    </div>
  )
}

export default Navbar