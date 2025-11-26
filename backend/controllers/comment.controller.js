import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    const { id } = req.params;
    const comment = req.body;

    if(!comment) {
        return res.status(400).json({
            success: false,
            message: "Comment must be filled!"
        });
    }

    try {
        const newComment = new Comment(comment);
        const savedComment = await newComment.save();

        res.status(201).json({
            success: true,
            data: savedComment
        });
    } catch (error) {
        console.error("Error in creating a comment!", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error!"
        });
    }
}

export const findAllComments = async (req, res) => {
    try {
        const comment = await Comment.find().populate("storyId", "storyId").populate("userId", "userId");

        if(!comment) {
            return res.status(404).json({
                success: false,
                message: "No comment found"
            });
        }

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        console.error("Error in fetching a comment!", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error!"
        });
    }
}

export const findComments = async (req, res) => {
    const { storyId } = req.query;

    try {
        const comment = await Comment.find({ storyId }).populate("storyId", "storyId").populate("userId", "username");

        if(!comment) {
            return res.status(404).json({
                success: false,
                message: "No comment found"
            });
        }

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        console.error("Error in fetching a comment!", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error!"
        });        
    }
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { $set: { comment } },
            { new: true, runValidators: true}
        );

        if(!updatedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedComment
        });
    } catch (error) {
        console.error("Error in updating a comment!", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error!"
        });
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findById(id);

        if(!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: deletedComment,
            message: "Comment deleted!"
        });
    } catch (error) {
        console.error("Error in deleting a comment!", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error!"
        });        
    }
}