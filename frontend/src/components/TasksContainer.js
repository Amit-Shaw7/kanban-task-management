import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import TaskSkelleton from './TaskSkelleton';

const TasksContainer = ({ status, tasks }) => {
    if (!tasks) {
        return (
            <div className='w-full h-full flex flex-col justify-start gap-2 mx-2'>
                <TaskSkelleton />
                <TaskSkelleton />
                <TaskSkelleton />
            </div>
        )
    }

    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`${status} overflow-y-scroll w-full h-full flex flex-col justify-start`}>
                    {
                        tasks?.map((task, idx) => (
                            <Task key={task?._id} index={idx} task={task} />
                        ))
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default TasksContainer;