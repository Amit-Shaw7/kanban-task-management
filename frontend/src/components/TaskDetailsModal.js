import React from 'react'
import { MdClose } from 'react-icons/md'
import TaskDetails from './TaskDetails'

const TaskDetailsModal = ({ open, handleClose }) => {
    return (
        <>
            {open && (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={handleClose}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <MdClose onClick={handleClose} fontSize="1.1rem" className="absolute top-1 right-1 cursor-pointer" />
                                <TaskDetails />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default TaskDetailsModal