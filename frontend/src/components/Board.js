import React from 'react'
import TasksContainer from './TasksContainer'

const Board = ({ tasks, status, color }) => {

    return (

        <div className={'h-[70vh] md:h-[90vh] rounded-md w-full flex flex-col'}>
            <h3 className={`p-2 font-extrabold text-left text-xl text-${color} underline`}>{status}</h3>
            <TasksContainer status={status} tasks={tasks} />
        </div>

    )
}

export default Board