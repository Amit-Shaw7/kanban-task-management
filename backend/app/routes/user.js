import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";
import validateUpdateProfile from "../controllers/user/validators/validateUpdateProfile.js";
import updateProfile from "../controllers/user/updateProfile.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import validateGetUser from "../controllers/user/validators/validateGetUser.js";
import getUser from "../controllers/user/getUser.js";
import getProfile from "../controllers/user/getProfile.js";

const UserRouter = express.Router();


// Authentication required 
UserRouter.get("/profile",
    isLoggedIn,
    checkUserPresent,
    getProfile
);

UserRouter.patch("/profile",
    validateUpdateProfile,
    isLoggedIn,
    checkUserPresent,
    updateProfile
);

UserRouter.get("/:id",
    validateGetUser,
    isLoggedIn,
    checkUserPresent,
    getUser
);


export default UserRouter;