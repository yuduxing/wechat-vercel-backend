import express from 'express';
import {
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from '../model/users.js'
import { authenticateToken } from '../middleware/userAuth.js'

const router = express.Router();

// 创建用户
//router.post('/', async (req, res) => {
//    const userData = req.body;
//    console.log(userData)
//    const createdUser = await createUser(userData);
//    if (createdUser) {
//        const loginData = {
//            uid: createdUser[0].userid,
//        };
//        console.log(loginData)
//        const token = await createToken(loginData)
//        console.log(token)
//        return res.status(201).json(createdUser);
//    }
//    return res.status(400).json({ error: 'Error creating user' });
//});

// 获取用户
router.get('/:userid', authenticateToken, async (req, res) => {
    const userId = req.params.userid;
    const user = await getUserById(userId);
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ error: 'User not found' });
});

// 更新用户
router.put('/:userid', authenticateToken, async (req, res) => {
    const userId = req.params.userid;
    const updates = req.body;
    const updatedUser = await updateUser(userId, updates);
    if (updatedUser) {
        return res.status(200).json(updatedUser);
    }
    return res.status(400).json({ error: 'Error updating user' });
});

// 删除用户
//router.delete('/:userid', authenticateToken, async (req, res) => {
//    const userId = req.params.userid;
//    const deletedUser = await deleteUser(userId);
//    if (deletedUser) {
//        return res.status(204).send(); // No Content
//    }
//    return res.status(404).json({ error: 'User not found' });
//});

export default router;