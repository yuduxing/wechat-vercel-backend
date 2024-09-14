import { getUserId } from '../utils/token.js'
import { getUserById } from '../model/users.js'


// 验证 JWT 中间件
export const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // 从 Authorization 头中获取 token
    try {
        if (!token) {
            return res.sendStatus(401); // 未提供 token
        }

        const tokenUserId = getUserId(token);
        const userId = req.params.userid;
        if (tokenUserId == 0 || tokenUserId != userId) {
            throw new Error('用户校验错误');
        }

        const user = await getUserById(userId);
        if (user) {
          next();
        } else {
          throw new Error('用户不存在 重新登录');
        }
      } catch (error) {
        next(error)
      }
};