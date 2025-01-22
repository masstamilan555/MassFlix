import { User } from "../models/user.model.js";
import bcryptjs from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be atleast 6 characters long' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Invalid email' });
            return;
        }
        const ExistingUser = await User.findOne({
            email
        });
        if (ExistingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const ExistingUsername = await User.findOne({
            username
        });
        if (ExistingUsername) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const Profile_Pics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = Profile_Pics[Math.floor(Math.random() * Profile_Pics.length)];
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            image

        });
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: {...newUser._doc,password:""} });



    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);

    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const user = await User.findOne({
            email
        });
        
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        generateToken(user._id, res);
        res.status(200).json({ message: 'Logged in successfully', user });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);

    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ message: 'Logged out successfully' });
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ message: 'User is authenticated', user: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
        
    }}