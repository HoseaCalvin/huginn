import User from "../models/user.model.js";

import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const user = req.body;

    if(!user.username || !user.dob || !user.password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }

    if(User.findOne(user.username)) {
        return res.status(400).json({
            success: false,
            message: "Username already taken!"
        });
    }

    try {
        const newUser = new User(user);
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        if(password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Wrong password!"
            })
        }
    
        const token = jwt.sign(
            { 
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        res.status(200).json({
            success: true,
            token,
            user
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })   
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "No users found!"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })  
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, dob } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { username, password, dob } },
            { new: true, runValidators: true}
        )

        res.status(200).json({
            success: true,
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })                
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            data: user,
            message: `User ${id} deleted!`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })               
    }
}