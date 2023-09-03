import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const updateTask = asyncError(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id , {...req.body} , {new : true});

    if(!task){
        return next(new ErrorHandler("Todo not found" , 404));
    }
    
    return res.status(200).json({
        msg: "Task updated successfully",
        task
    });
});

export default updateTask;