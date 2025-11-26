import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    storyId: {
        type: Schema.Types.ObjectId,
        ref: "Story",
        required: true        
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;