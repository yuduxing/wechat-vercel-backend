import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/index.js"

export const getUserId = (token) => {
    if (!token) {
        return 0;
    }
    const result = parseToken(token);
    if (!result || result.uid <= 0) {
        return 0;
    }
    return result.uid;
}

export const parseToken = (token) => {
    if (token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return null;
        }
    }
    return null;
}

export const createToken = async (userInfo) => {
    const token = jwt.sign(userInfo, JWT_SECRET);
    return token;
}
