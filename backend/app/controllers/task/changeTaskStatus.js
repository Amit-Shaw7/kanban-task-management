import Task from "../../models/Task.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const changeTaskStatus = asyncError(async (req, res, next) => {
    const user = req.user;
    const { toStatus, draggedTaskId } = req.body;

    const tasks = await Task.find({user : user?._id , status : toStatus});
    const taskDragged = await Task.findById(draggedTaskId);
    
    if (!taskDragged) {
        return next(new ErrorHandler("Task not found", 404));
    }
    if(tasks.length === 0){
        taskDragged.index = 0;
    }else{
        taskDragged.index =  tasks[tasks.length - 1].index + 1;
    }
    taskDragged.status = toStatus;

    await taskDragged.save();

    return res.status(200).json({
        msg: "Task swapped successfully",
    });
});

export default changeTaskStatus;