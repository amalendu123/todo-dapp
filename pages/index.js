import { taskContext } from '@/Context/task'
import Hero from '@/components/Hero'
import React, { useContext, useEffect, useState } from 'react'

const Index = () => {
  const { createTask, getTask, currentAccount,markAscompleted,deletetask } = useContext(taskContext);
  const [alltask, setAllTask] = useState([]);
  const [Tasks, settasks] = useState({ task: "" });

  const createTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await createTask(Tasks);
      console.log("Task created:", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const taskData = await getTask();
      setAllTask(taskData);
      console.log("task:", taskData);
    }
    if (currentAccount) {
      fetchData();
    }
  }, [currentAccount]);

  return (
    <div>
      <div className='h-screen w-screen flex justify-center font-Poppins'>
        <div className='flex flex-col justify-center items-center gap-5'>
          <h1 className='text-3xl'>Tasks</h1>
          {alltask.length === 0 ? (
            <div className='flex justify-center items-center text-center'>
              <h1 className="font-Poppins text-black">All tasks are completed</h1>
            </div>
          ) : (
            <>
            {alltask.map((task, index) => {
              const isChecked = task.completed === true;
          
              return (
                  <div key={index}>
                      <input 
                          type='checkbox' 
                          checked={isChecked} 
                          onChange={ () => {
                               markAscompleted(task.pid);
                          }} 
                          className='mr-2'
                      />
                      {task.task}
                  </div>
              );
          })}
            </>
          )}
          <input
            type="text"
            placeholder="Enter the tasks"
            className="p-2 max-w-56"
            onChange={(e) => settasks({ task: e.target.value })}
          />
          <div className='flex gap-5'>
            <button className='flex justify-center items-center bg-red-400 w-28 h-10' onClick={deletetask}>Delete</button>
            <button className='flex justify-center items-center bg-red-400 w-28 h-10' onClick={createTaskHandler}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
