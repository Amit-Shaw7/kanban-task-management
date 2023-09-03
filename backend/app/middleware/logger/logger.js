import { __dirname } from "../../../globals.js";

export const logger = (req , res , next) => {
    console.log(`${req.method} ${req.path}`);
    next();
}

