import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import addTask from "../controllers/task/addTask.js";
import getTodo from "../controllers/task/getTodo.js";
import getDoing from "../controllers/task/getDoing.js";
import getDone from "../controllers/task/getDone.js";
import updateTask from "../controllers/task/updateTask.js";
import validateAddTask from "../controllers/task/validators/validateAddTask.js";
import validateUpdateTask from "../controllers/task/validators/validateUpdateTask.js";
import validateDeleteTask from "../controllers/task/validators/validateDeleteTask.js";
import deleteTask from "../controllers/task/deleteTask.js";
import validateChangeTaskStatus from "../controllers/task/validators/validatechangeTaskStatus.js";
import changeTaskStatus from "../controllers/task/changeTaskStatus.js";
import validateSwapIndex from "../controllers/task/validators/validateSwapIndex.js";
import swapIndex from "../controllers/task/swapIndex.js";

const TaskRouter = express.Router();

// Authentication required 
TaskRouter.post("/add",
    isLoggedIn,
    checkUserPresent,
    validateAddTask,
    addTask
);

TaskRouter.get("/todo",
    isLoggedIn,
    checkUserPresent,
    getTodo
);

TaskRouter.get("/doing",
    isLoggedIn,
    checkUserPresent,
    getDoing
);
TaskRouter.get("/done",
    isLoggedIn,
    checkUserPresent,
    getDone
);

TaskRouter.patch("/changeStatus",
    isLoggedIn,
    checkUserPresent,
    validateChangeTaskStatus,
    changeTaskStatus
);
TaskRouter.patch("/swap",
    isLoggedIn,
    checkUserPresent,
    validateSwapIndex,
    swapIndex
);

TaskRouter.patch("/:id",
    isLoggedIn,
    checkUserPresent,
    validateUpdateTask,
    updateTask
);

TaskRouter.delete("/:id",
    isLoggedIn,
    checkUserPresent,
    validateDeleteTask,
    deleteTask
);

export default TaskRouter;