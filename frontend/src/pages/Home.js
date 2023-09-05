import React, { useEffect } from 'react';
import Board from '../components/Board';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../store/actions/UserActions';
import { changeTaskStatus, getDoing, getDone, getTodo, swapTaskIndex } from '../store/actions/TaskActions';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar';
import AddTaskBtn from '../components/AddTaskBtn';

const checkLogin = async (dispatch, navigate) => {
  dispatch(loadUser(navigate));
};

const Home = () => {
  const { todo, doing, done } = useSelector(state => state.task);
  const { taskType } = useSelector(state => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    } else if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    } else if (destination.droppableId === source.droppableId && destination.index !== source.index) {
      if (destination.droppableId === "Todo") {
        let arr = [...todo];
        let temp = arr[source.index];
        arr[source.index] = arr[destination.index];
        arr[destination.index] = temp;
        const draggedId = arr[source.index]._id;
        const droppedId = arr[destination.index]._id;
        const data = {
          tasks: {
            active: [...arr],
            running: doing,
            completed: done
          },
          draggedId,
          droppedId
        }
        dispatch(swapTaskIndex(data));
      } else if (destination.droppableId === "Doing") {
        let arr = [...doing];
        let temp = arr[source.index];
        arr[source.index] = arr[destination.index];
        arr[destination.index] = temp;
        const draggedId = arr[source.index]._id;
        const droppedId = arr[destination.index]._id;
        const data = {
          tasks: {
            active: todo,
            running: [...arr],
            completed: done
          },
          draggedId,
          droppedId
        }
        dispatch(swapTaskIndex(data));
      } else {
        let arr = [...done];
        let temp = arr[source.index];
        arr[source.index] = arr[destination.index];
        arr[destination.index] = temp;
        const draggedId = arr[source.index]._id;
        const droppedId = arr[destination.index]._id;
        console.log(arr);
        const data = {
          tasks: {
            active: todo,
            running: doing,
            completed: [...arr]
          },
          draggedId,
          droppedId
        }
        dispatch(swapTaskIndex(data));
      }
    } else {


      let add;
      let active = [...todo];
      let running = [...doing];
      let completed = [...done];
      let index;

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
        index = active.length;
        active.splice(destination.index, 0, add);
      } else if (destination.droppableId === "Doing") {
        index = running.length;
        running.splice(destination.index, 0, add);
      } else {
        index = completed.length;
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
        index
      }
      dispatch(changeTaskStatus(data))
    }
  }

  useEffect(() => {
    checkLogin(dispatch, navigate);
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getTodo());
    dispatch(getDoing());
    dispatch(getDone());
  }, [dispatch , taskType]);

  return (
    <div className='dark:bg-dark bg-light mt-[60px] h-[100vh] md:h-[91.6vh] overflow-hidden'>
      <Navbar />
      <DragDropContext onDragEnd={handleDragEnd}>
        {
          window.innerWidth > 768

            ?
            <div className='grid grid-cols-3 py-2 px-12 w-full'>
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