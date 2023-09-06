import React, { useState } from 'react';
import { MdDelete, MdDone, MdEdit, MdStopCircle, MdUpdate } from 'react-icons/md';
import Card from './Card';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { changeTaskStatusForMobile, deleteTask } from '../store/actions/TaskActions';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ index, task }) => {
  const dispatch = useDispatch();
  const [showAcion, setShowAcion] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const changeStatus = (toStatus) => {
    const data = {
      toStatus,
      task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        index: task.index,
        status: toStatus
      },
      index: index
    }
    dispatch(changeTaskStatusForMobile(data));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task?._id));
  };

  return (
    <>
      <Draggable draggableId={task?._id.toString()} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={() => setShowAcion(true)}
            onMouseLeave={() => setShowAcion(false)}
            className='flex relative h-max w-full p-1'
          >
            <Card>
              <div className='h-max flex flex-col gap-2 dark:text-white text-black'>
                <p className='font-bold text-md cursor-pointer mt-3'>{task?.title}</p>
                <div className='min-h-[30px]'>
                  <p className='break-normal text-sm'>{task?.description}</p>
                  {/* <textarea className='h-fit border-none outline-none text-sm bg-light-card resize-none dark:bg-dark-card text-black dark:text-white w-full' value={task?.description}/> */}
                </div>
              </div>
              {showAcion && <div className='flex  absolute top-2 right-1 gap-2'>
                {task?.status === 'Done' && <MdStopCircle onClick={() => changeStatus('Todo')} className='flex md:hidden text-2xl text-red cursor-pointer' />}
                {task?.status === 'Todo' && <MdUpdate onClick={() => changeStatus('Doing')} className='flex md:hidden text-2xl text-yellow cursor-pointer' />}
                {task?.status === 'Doing' && <MdDone onClick={() => changeStatus('Done')} className='flex md:hidden text-2xl text-green cursor-pointer' />}
                <MdEdit onClick={() => setOpen(true)} className='text-2xl cursor-pointer text-blue' />
                <MdDelete onClick={handleDelete} className='text-2xl cursor-pointer text-red' />
              </div>}
            </Card>
          </div>
        )}
      </Draggable>

      <Modal
        task={task}
        type='edit'
        open={open}
        handleClose={handleClose}
      />


    </>
  )
}

export default Task;