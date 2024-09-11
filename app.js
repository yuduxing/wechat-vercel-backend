import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet';

import { RouterInit } from './router/index.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

RouterInit(app)

// 统一处理错误
app.use((err, req, res, next) => {
    res.json({ errcode: err.code || 100, errmsg: err.message });
});

// 不匹配的路由 返回404
app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(3000, () => console.log("Server ready on port 3000."));