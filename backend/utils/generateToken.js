import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';
export const generateToken = (userid,res) => {
    const token= jwt.sign({ userid }, ENV_VARS.JWT_SECRET, {
        expiresIn: '15d',

    });
    res.cookie('jwt-netflix', token, {
        httpOnly: true, //prevents cookie from being accessed through client side script like js
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
        sameSite:"strict" ,//CSRF protection
        secure: ENV_VARS.NODE_ENV !== "development"//cookie will only be sent over HTTPS in production
    })
    return token
};