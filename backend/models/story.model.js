import mongoose from "mongoose";
import { Schema } from "mongoose";

const storySchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        maxlength: 30,
        required: true
    },
    story: {
        type: String,
        maxlength: 500,
        required: true
    },
    categories: {
        type: Array,
        maxlength: 5,
        required: true
    },
    // image: {
    //     type: String,
    //     default: 'default-photo.png'
    // },
    reactions: {
        heart: {
            type: Number,
            default: 0
        },
        cry: {
            type: Number,
            default: 0
        },
        laugh: {
            type: Number,
            default: 0
        },
        angry: {
            type: Number,
            default: 0
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Story = mongoose.model('Story', storySchema);

export default Story;