import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User is required feild"],
        ref : "User"
    },
    title: {
        type: String,
        required: [true, "Title is required feild"],
    },
    description: {
        type: String,
        required: [true, "Description is required feild"],
    },
    status : {
        type : String,
        default : "Todo",
        enum : ["Todo" , "Doing" , "Done"]
    },
    index : {
        required : true,
        type : Number,
    }
}, { timestamps: true });


const Task = mongoose.model("Task", TaskSchema);
export default Task;