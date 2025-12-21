import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt"

import crypto from "crypto"
import { Meeting } from "../models/meeting.model.js";

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide both username and password" })
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" })
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" })
        }

    } catch (e) {
        console.error("Login Error:", e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error during login: ${e.message}` })
    }
}


const register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide name, username, and password" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered Successfully" })

    } catch (e) {
        console.error("Register Error:", e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error during registration: ${e.message}` })
    }

}


const getUserHistory = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Token is required" });
    }

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found or invalid token" });
        }

        const meetings = await Meeting.find({ user_id: user.username })
        res.status(httpStatus.OK).json(meetings)
    } catch (e) {
        console.error("History Error:", e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error fetching history: ${e.message}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    if (!token || !meeting_code) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Token and meeting code are required" });
    }

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found or invalid token" });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        console.error("Add History Error:", e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error adding to history: ${e.message}` })
    }
}


const googleAuth = async (req, res) => {
    const { name, username, email } = req.body;

    if (!username || !email) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and email are required for Google Auth" });
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // User exists, generate token and login
            let token = crypto.randomBytes(20).toString("hex");
            existingUser.token = token;
            await existingUser.save();
            return res.status(httpStatus.OK).json({ token: token });
        } else {
            // Create new user
            const newUser = new User({
                name: name,
                username: username,
                email: email,
                // No password for Google Auth users
            });

            let token = crypto.randomBytes(20).toString("hex");
            newUser.token = token;

            await newUser.save();
            return res.status(httpStatus.CREATED).json({ token: token });
        }

    } catch (e) {
        console.error("Google Auth Error:", e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error during Google Auth: ${e.message}` })
    }
}

export { login, register, getUserHistory, addToHistory, googleAuth }