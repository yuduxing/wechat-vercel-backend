import { requestAsync } from "./http.js"
<<<<<<< HEAD
import { appId, appSecret } from "../config/index.js"
=======
import { APP_ID, APP_SECRET } from "../config/index.js"
>>>>>>> ccbb4f1 (fix)

/**
 * code 换取 session_key
 */
export const getSessionKey = async (code) =>  {
<<<<<<< HEAD
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
=======
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`
>>>>>>> ccbb4f1 (fix)
    return requestAsync(url)
}