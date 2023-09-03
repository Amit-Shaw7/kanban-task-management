import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const register = asyncError(async (req, res, next) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new ErrorHandler("EMAIL_ALREADY_EXISTS", 400));
    }

    const user = new User(req.body);
    await user.save();

    return res.status(200).json({
        msg: "SIGNED_UP_SUCCESFULLY"
    });
})
export default register;