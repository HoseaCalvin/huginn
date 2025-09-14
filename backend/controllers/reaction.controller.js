import Story from "../models/story.model.js";
import { sendToAll } from "../routes/sse.js";

export const addReactions = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    const validReactions = ["heart", "cry", "laugh", "angry"];

    if (!validReactions.includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Invalid reaction type"
        });
    }

    try {
        const updateStory = await Story.findByIdAndUpdate(
            id,
            { $inc: { [`reactions.${type}`]: 1 } },
            { new: true, runValidators: true }
        );

        sendToAll("reaction_update", updateStory);
        
        res.status(200).json({
            success: true,
            data: updateStory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
