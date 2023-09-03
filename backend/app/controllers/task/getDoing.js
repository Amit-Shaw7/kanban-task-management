import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getDoing = asyncError(async (req, res, next) => {
    const user = req.user;
    const tasks = await Task.find({user : user._id , status : "Doing"}).sort({index : 1});

    return res.status(200).json({
        msg: "Tasks fetched successfully",
        tasks
    });
});

export default getDoing;