import { MdClose } from "react-icons/md";
import TaskForm from "./TaskForm";

export default function Modal({task, open, handleClose, type }) {
    
    return (
        <>
            {open && (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-70"
                            onClick={handleClose}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="bg-light dark:bg-dark relative w-full max-w-lg p-4 mx-auto rounded-md shadow-sm shadow-gray">
                                <MdClose onClick={handleClose} fontSize="1.1rem" className="absolute top-1 right-1 cursor-pointer text-xl text-black dark:text-white" />
                                <TaskForm task={task} handleClose={handleClose} type={type} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}