import React from 'react'
import Card from './Card'

const TaskSkelleton = () => {
    return (
        <Card>
            <div className='animate-pulse flex flex-col gap-3 dark:text-white text-black'>
                <div>
                    <div className='rounded-md h-3 bg-gray'></div>
                </div>
                <div>
                    <div className='rounded-md h-6 bg-gray'></div>
                </div>
            </div>
        </Card>
    )
}

export default TaskSkelleton