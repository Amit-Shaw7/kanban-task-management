import React, { useState } from 'react';
import Button from './Button';
import { RiAddLine } from "react-icons/ri";
import Modal from './Modal';

const AddTaskBtn = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className='fixed top-[90%] right-5'>
                <Button onClickFn={() => setOpen(true)} name="add-task" type="round" text={<RiAddLine fontSize="2rem" />} />
            </div>
            <Modal title="" description="" open={open} handleClose={handleClose} type="add"/>
        </> 
    )
}

export default AddTaskBtn;