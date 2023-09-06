import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../store/actions/UserActions';
import { changeTaskStatus, getDoing, getDone, getTodo, swapTaskIndex } from '../store/actions/TaskActions';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar';
import AddTaskBtn from '../components/AddTaskBtn';
import useResponsive from '../utils/useResponsive';

const checkLogin = async (dispatch, navigate) => {
  dispatch(loadUser(navigate));
};

const Home = () => {
  const { todo, doing, done } = useSelector(state => state.task);
  const { taskType } = useSelector(state => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displaySize = useResponsive();

  const hanleDragEndForDifferentStatus = (source, destination) => {
    let add;
    let active = [...todo];
    let running = [...doing];
    let completed = [...done];

    if (source.droppableId === "Todo") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "Doing") {
      add = running[source.index];
      running.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "Todo") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "Doing") {
      running.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    const data = {
      tasks: {
        active,
        running,
        completed
      },
      toStatus: destination.droppableId,
      draggedTaskId: add._id,
    }
    dispatch(changeTaskStatus(data))
  };

  const hanleDragEndForSameStatus = (source, destination) => {
    let data = {};
    if (destination.droppableId === "Todo") {
      let arr = [...todo];
      let temp = arr[source.index];
      arr[source.index] = arr[destination.index];
      arr[destination.index] = temp;
      const draggedId = arr[source.index]._id;
      const droppedId = arr[destination.index]._id;
      data = {
        tasks: {
          active: [...arr],
          running: doing,
          completed: done
        },
        draggedId,
        droppedId
      }
    } else if (destination.droppableId === "Doing") {
      let arr = [...doing];
      let temp = arr[source.index];
      arr[source.index] = arr[destination.index];
      arr[destination.index] = temp;
      const draggedId = arr[source.index]._id;
      const droppedId = arr[destination.index]._id;
      data = {
        tasks: {
          active: todo,
          running: [...arr],
          completed: done
        },
        draggedId,
        droppedId
      }
    } else {
      let arr = [...done];
      let temp = arr[source.index];
      arr[source.index] = arr[destination.index];
      arr[destination.index] = temp;
      const draggedId = arr[source.index]._id;
      const droppedId = arr[destination.index]._id;
      data = {
        tasks: {
          active: todo,
          running: doing,
          completed: [...arr]
        },
        draggedId,
        droppedId
      }
    }
    dispatch(swapTaskIndex(data));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    } else if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    } else if (destination.droppableId === source.droppableId && destination.index !== source.index) {
      hanleDragEndForSameStatus(source, destination);
    } else {
      hanleDragEndForDifferentStatus(source, destination);
    }
  }


  useEffect(() => {
    checkLogin(dispatch, navigate);
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getTodo());
    dispatch(getDoing());
    dispatch(getDone());
  }, [dispatch]);

  return (
    <div className='dark:bg-dark bg-light mt-[60px] h-[100vh] md:h-[91.6vh] overflow-hidden'>
      <Navbar />
      <DragDropContext onDragEnd={handleDragEnd}>
        {
          displaySize > 768
 
            ?
            <div className='hidden md:grid grid-cols-3 py-2 px-12 w-full'>
              <Board tasks={todo} status="Todo" color="red" />

              <Board tasks={doing} status="Doing" color="yellow" />

              <Board tasks={done} status="Done" color="green" />
            </div>

            :

            <div className='grid gap-4 px-6 w-full'>
              {taskType === "Todo" && <div className='w-full'>
                <Board tasks={todo} status="Todo" color="red" />
              </div>}

              {taskType === "Doing" && <div className='w-full'>
                <Board tasks={doing} status="Doing" color="yellow" />
              </div>}

              {taskType === "Done" && <div className='w-full'>
                <Board tasks={done} status="Done" color="green" />
              </div>}
            </div>
        }

      </DragDropContext>
      <AddTaskBtn />
    </div>
  )
}

export default Home;