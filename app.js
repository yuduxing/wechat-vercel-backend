const express = require("express");

const appId = process.env.AppID;
const appSecret = process.env.AppSecret;

/**
 * 封装request请求
 */
const requestAsync = (url) => {
    return new Promise((reslove, reject) => {
        request({url: url}, (err, res, body) => {
            if (err) return reject(err)
            return reslove(body)
        })
    })
}

/**
 * code 换取 session_key
 */
const getSessionKey = (code) => {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    return this.requestAsync(url)
}

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel" + appId));

app.post("/api/wechatLogin", (req, res) => {
    const code = req.body.code
    getSessionKey(code)
    .then(doc => {
        rsp = JSON.parse(doc)
        if (rsp && rsp.errmsg) return rsp.errmsg
        
        if (rsp && rsp.openid) return rsp.openid
    })
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;