import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: [true, "Name is required feild"],
    },
    email: {
        type: String,
        required: [true, "Email is required feild"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const generateSalt = async (user, salt_factor, next) => {
    try {
        const salt = await bcryptjs.genSalt(salt_factor);
        return createHash(user, salt, next);
    } catch (error) {
        return next(error);
    }
}

const createHash = async (user, salt, next) => {
    try {
        const hashed = await bcryptjs.hash(user.password, salt);
        user.password = hashed;
        return next();
    } catch (error) {
        return next(error);
    }
}

UserSchema.pre('save', function (next) {
    const salt_factor = 5;
    if (!this.isModified("password")) {
        return next();
    }
    return generateSalt(this, salt_factor, next);
});

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
    bcryptjs.compare(passwordAttempt, this.password, (err, isMatch) =>
        err ? cb(err) : cb(null, isMatch)
    )
}

const User = mongoose.model("User", UserSchema);
export default User;