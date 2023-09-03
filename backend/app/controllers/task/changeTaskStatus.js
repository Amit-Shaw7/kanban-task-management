import Task from "../../models/Task.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const changeTaskStatus = asyncError(async (req, res, next) => {
    const { toStatus, draggedTaskId, index } = req.body;
    const taskDragged = await Task.findById(draggedTaskId);

    if (!taskDragged) {
        return next(new ErrorHandler("Task not found", 404));
    }
    taskDragged.status = toStatus;
    taskDragged.index = index;

    await taskDragged.save();

    return res.status(200).json({
        msg: "Task swapped successfully",
    });
});

export default changeTaskStatus;