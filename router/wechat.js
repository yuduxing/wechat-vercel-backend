import express from 'express';
import { getSessionKey } from "../utils/wechat.js";

const router = express.Router();

router.post("/wechatLogin", async (req, res) => {
    const code = req.body.code;
    const result = await getSessionKey(code);
    const resultJson = JSON.parse(result);
    res.json(resultJson);
});

export default router;