import express from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../model/users.js';
import { authenticateToken } from '../middleware/userAuth.js';
import { success } from '../utils/http.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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
    return res.status(200).json(success(user));
  }
  return res.status(404).json({ error: 'User not found' });
});

// 更新用户
router.put('/:userid', authenticateToken, async (req, res) => {
  const userId = req.params.userid;
  const updates = req.body;
  const updatedUser = await updateUser(userId, updates);
  if (updatedUser) {
    return res.status(200).json(success(updatedUser));
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

router.post('/:userid/avatar', authenticateToken, upload.single('file'), async (req, res, next) => {
  try {
    const blob = await put(req.query.filename, req.file.buffer, {
      access: 'public',
    });

    const update = {
      avatar: blob.url,
    }
    updateUser(req.params.userid, update)

    return res.json(success(blob));
  } catch (error) {
    next(error); // 将错误传递给下一个中间件
  }
});

export default router;
