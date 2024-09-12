import express from 'express';
import { getSessionKey } from '../utils/wechat.js';
import { createToken } from '../utils/token.js';
import { success } from '../utils/http.js';

const router = express.Router();

router.post('/wechatLogin', async (req, res, next) => {
  try {
    const code = req.body.code;
    const result = await getSessionKey(code);
    const resultJson = JSON.parse(result);
    if (!resultJson.openid) {
      throw new Error('微信登陆错误');
    }

    //TODO: 保存openid，换取uid
    const loginData = {
      uid: resultJson.openid,
    };

    const token = await createToken(loginData);
    loginData.token = token;

    res.json(success(loginData));
  } catch (error) {
    next(error); // 将错误传递给下一个中间件
  }
});

export default router;
