import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const swapIndex = asyncError(async (req, res, next) => {
    const { draggedId, droppedId } = req.body;
    const draggedTask = await Task.findById(draggedId);
    const droppededTask = await Task.findById(droppedId);

    if (!draggedTask) {
        return next(new ErrorHandler("Task not found", 404));
    }

    if (!droppededTask) {
        return next(new ErrorHandler("Task not found", 404));
    }

    let tempIndex = draggedTask.index;
    draggedTask.index = droppededTask.index;
    droppededTask.index = tempIndex;

    await draggedTask.save();
    await droppededTask.save();

    return res.status(200).json({
        msg : "Swapped"
    })
});

export default swapIndex;