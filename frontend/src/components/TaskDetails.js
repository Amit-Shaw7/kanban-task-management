import React from 'react'

const TaskDetails = () => {
    return (
        <div className='flex flex-col gap-3 min-h-[200px]'>
            <h3 className={`font-extrabold text-xl text-red underline`}>Todo</h3>
            <h3 className='text-lg font-semibold'>Title of task</h3>
            <h3>Description of task</h3>
        </div>
    )
}

export default TaskDetails;