import React, { useState } from 'react'

const Hero = () => {
  const [Tasks,settasks] = useState([]);
  return (
    <div className='h-screen w-screen  flex justify-center font-Poppins '>
      <div className='flex flex-col justify-center items-center gap-5'>
      <h1 className='text-3xl'>Tasks</h1>
      {
        Tasks.length===0?<div className='flex justify-center items-center text-center'><h1 className="font-Poppins text-black" >All tasks are completed</h1></div>:<></>
      }
      <input type = "text" placeholder="Enter the tasks" className="p-2 max-w-56 "></input>
      <div className='flex gap-5'>
        <button className='flex justify-center items-center bg-red-400 w-28 h-10'>Delete</button>
        <button className='flex justify-center items-center bg-red-400 w-28 h-10'>Add</button>
       </div>
      </div>
       
    </div>
  )
}

export default Hero