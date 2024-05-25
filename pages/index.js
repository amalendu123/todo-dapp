import { taskContext } from '@/Context/task'
import Hero from '@/components/Hero'
import React, { useContext, useEffect, useState } from 'react'

const index = () => {
  const {createTask,getTask} = useContext(taskContext);
  const [alltask,setalltask] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      const taskdata = await getTask();
    setalltask(alltask); 
    console.log("task:",taskdata)
    }
    fetchData();
  },[])
  return (
    <div>
      <Hero createTask={createTask}/>
    </div>
  )
}

export default index