import React from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd';

const TasksContainer = ({ status, tasks }) => {
    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`overflow-y-scroll w-full h-full flex flex-col justify-start`}>
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

export default TasksContainer