import Task from "../../models/Task.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";

const getTodo = asyncError(async (req, res, next) => {
    const user = req.user;
    const tasks = await Task.find({user : user._id , status : "Todo"}).sort({index : 1});

    return res.status(200).json({
        msg: "Tasks fetched successfully",
        tasks
    });
});

export default getTodo;