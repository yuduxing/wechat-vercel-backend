import { requestAsync } from "./http.js"
import { appId, appSecret } from "../config/index.js"

/**
 * code 换取 session_key
 */
export const getSessionKey = async (code) =>  {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    return requestAsync(url)
}