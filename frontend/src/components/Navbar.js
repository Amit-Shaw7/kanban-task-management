import React from 'react';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { changeTaskType } from '../store/actions/AppAction';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {taskType} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const handleChangeTaskStatus = (status) => {
        dispatch(changeTaskType(status));
    }
    return (
        <div className='md:hidden h-[60px] w-[90%] m-auto mt-4 flex items-center justify-center'>
            <Card>
                <ul className='flex items-center justify-center gap-10'>
                    <li onClick={() => handleChangeTaskStatus("Todo")} className={`cursor-pointer p-1 font-extrabold bg-light dark:bg-dark-card ${taskType === "Todo" ? "text-btn" : "text-black dark:text-white"}`}>Todo</li>
                    <li onClick={() => handleChangeTaskStatus("Doing")} className={`cursor-pointer p-1 font-extrabold bg-light dark:bg-dark-card ${taskType === "Doing" ? "text-btn" : "text-black dark:text-white"}`}>Doing</li>
                    <li onClick={() => handleChangeTaskStatus("Done")} className={`cursor-pointer p-1 font-extrabold bg-light dark:bg-dark-card ${taskType === "Done" ? "text-btn" : "text-black dark:text-white"}`}>Done</li>
                </ul>
            </Card>
        </div>
    )
}

export default Navbar;