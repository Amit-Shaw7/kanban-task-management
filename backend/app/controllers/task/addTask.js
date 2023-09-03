import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const addTask = asyncError(async (req, res, next) => {
    const user = req.user;
    req.body.user = user?._id;
    const task = await Task.create({...req.body});

    return res.status(200).json({
        msg: "Task added sucessfully",
        task
    });
});

export default addTask;