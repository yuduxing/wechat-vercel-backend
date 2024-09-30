import { requestAsync } from "./http.js"
import { APP_ID, APP_SECRET } from "../config/index.js"

/**
 * code 换取 session_key
 */
export const getSessionKey = async (code) =>  {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`
    return requestAsync(url)
}