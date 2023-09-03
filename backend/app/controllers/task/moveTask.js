import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const moveTask = asyncError(async (req, res, next) => {
    const {status , index} = req.body;
    const task = await Task.findById(req.params.id);
    if(!task){
        return next(new ErrorHandler("Todo not found" , 404));
    }

    task.status = status;
    task.index = index;
    await task.save();

    return res.status(200).json({
        msg: "Task updated successfully",
        task
    });
});

export default moveTask;