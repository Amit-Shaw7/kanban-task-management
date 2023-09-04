import React, { useState } from 'react';
import { MdDelete, MdDone, MdEdit, MdMoreVert, MdStopCircle, MdUpdate } from "react-icons/md";
import Card from './Card';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { changeTaskStatusForMobile, deleteDoing, deleteDone, deleteTask } from '../store/actions/TaskActions';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const Task = ({ index, task }) => {
  const { todo, doing, done } = useSelector(state => state.task);
  const dispatch = useDispatch();
  const [showAcion, setShowAcion] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const changeStatus = (toStatus) => {
    let index;
    if (toStatus === "Todo") {
      index = todo.length;
    } else if (toStatus === "Doing") {
      index = doing.length;
    } else {
      index = done.length;
    }
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
  }

  const handleDelete = () => {
    if (task?.status === "Todo") {
      dispatch(deleteTask(task?._id));
    } else if (task?.status === "Doing") {
      dispatch(deleteDoing(task?._id));
    } else if (task?.status === "Done") {
      dispatch(deleteDone(task?._id));
    }
  }

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
              <div className='flex flex-col gap-2 dark:text-white text-black'>
                <p className='font-bold text-md cursor-pointer'>{task?.title}</p>
                <p className='text-sm'>{task?.description}</p>
              </div>
              {showAcion && <div className='flex  absolute top-2 right-1 gap-2'>
                {task?.status === "Done" && <MdStopCircle onClick={() => changeStatus("Todo")} className='flex md:hidden text-xl text-red cursor-pointer' />}
                {task?.status === "Todo" && <MdUpdate onClick={() => changeStatus("Doing")} className='flex md:hidden text-xl text-yellow cursor-pointer' />}
                {task?.status === "Doing" && <MdDone onClick={() => changeStatus("Done")} className='flex md:hidden text-xl text-green cursor-pointer' />}
                <MdEdit onClick={() => setOpen(true)} className='text-lg cursor-pointer text-blue' />
                <MdDelete onClick={handleDelete} className='text-lg cursor-pointer text-red' />
              </div>}
            </Card>
          </div>
        )}
      </Draggable>

      <Modal
        task={task}
        type="edit"
        open={open}
        handleClose={handleClose}
      />


    </>
  )
}

export default Task