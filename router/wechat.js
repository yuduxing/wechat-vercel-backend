import express from 'express';
import { getSessionKey } from '../utils/wechat.js';
import { createToken } from '../utils/token.js';
import { success } from '../utils/http.js';
import { createUser, getUserByOpenId } from '../model/users.js';

const router = express.Router();

router.post('/wechatLogin', async (req, res, next) => {
  try {
    const code = req.body.code;
    console.log(code);
    const result = await getSessionKey(code);
    const resultJson = JSON.parse(result);
    if (!resultJson.openid) {
      throw new Error('微信登陆错误');
    }
    console.log(resultJson);

    const openId = resultJson.openid;
    console.log(openId);
    const userInfo = await getUserByOpenId(openId);
    console.log("userInfo:" + JSON.stringify(userInfo));
    let userId = 0;
    // 用户不存在就新建
    if (userInfo === null) {
      const userData = {
        openid: openId,
      };
      const createdUser = await createUser(userData);
      if (createdUser === null || createUser.length != 1) {
        throw new Error('新建用户错误');
      }
      userId = createdUser[0].userid;
    } else {
      userId = userInfo.userid;
    }
    console.log("userId:" + userId);
    const loginData = {
      uid: userId,
    };

    const token = await createToken(loginData);
    loginData.token = token;
    if (userInfo) {
      loginData.nickname = userInfo.nickname;
      loginData.avatar = userInfo.avatar;
    }

    res.json(success(loginData));
  } catch (error) {
    next(error); // 将错误传递给下一个中间件
  }
});

export default router;
