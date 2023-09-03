import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const deleteTask = asyncError(async (req, res, next) => {
    const user = req.user;
    const task = await Task.findByIdAndDelete(req.params.id);

    if(!task){
        return next(new ErrorHandler("Task not found" , 404));
    }

    return res.status(200).json({
        msg: "Task deleted successfully",
        task
    });
});

export default deleteTask;