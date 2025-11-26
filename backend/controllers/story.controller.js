import Story from '../models/story.model.js';

import { sendToAll } from '../routes/sse.js';

export const createStory = async (req, res) => {
    const story = req.body;

    if(!story.title || !story.story) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required!'
        });
    }

    try {
        const newStory = new Story(story);
        const savedStory = await newStory.save();

        sendToAll("new_story", savedStory);
        
        res.status(201).json({
            success: true,
            data: newStory
        });
    } catch (error) {
        console.error('Error in creating a Story!', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const findUserStories = async (req, res) => {
    const { userId } = req.query;

    try {
        const story = await Story.find({ userId });
        
        if(!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: story
        });
    } catch (error) {
        console.error('Error in finding a Story!', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });        
    }
}

export const findStories = async (req, res) => {
    try {
        const story = await Story.find().populate("userId", "username");

        if(!story) {
            return res.status(404).json({
                success: false,
                message: "No Stories!"
            })
        }

        res.status(200).json({
            success: true,
            data: story
        });
    } catch (error) {
        console.error('Error in getting all Stories!', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const findStory = async (req, res) => {
    const { id } = req.params;

    try {
        const story = await Story.findById(id).populate("userId", "username");;

        if(!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: story
        });
    } catch (error) {
        console.error('Error in getting a Story!', error.message);        
    }
};

export const updateStory = async (req, res) => {
    const { id } = req.params;
    const { story, categories, thumbnail } = req.body;

    try {
        const updatedStory = await Story.findByIdAndUpdate(
            id,
            { $set: { story, categories, thumbnail } },
            { new: true, runValidators: true }
        );

        if(!updatedStory) {
            return res.status(404).json({
                success: false,
                message: "Story not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedStory
        });
    } catch (error) {
        console.error('Error in deleting a Story!', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });         
    }
};

export const deleteStory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStory = await Story.findByIdAndDelete(id);

        if(!deletedStory) {
            return res.status(404).json({
                success: false,
                message: "Story not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: deletedStory,
            message: "Story deleted!"
        });
    } catch (error) {
        console.error('Error in deleting a Story!', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });        
    }
};