import request from "request"

/**
 * 封装request请求
 */
export const requestAsync = (url) => {
    return new Promise((reslove, reject) => {
        request({url: url}, (err, res, body) => {
            if (err) return reject(err)
            return reslove(body)
        })
    })
}