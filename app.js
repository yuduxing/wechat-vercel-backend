const express = require("express");

const appId = process.env.AppID
const appSecret = process.env.AppSecret



const app = express();

app.get("/", (req, res) => res.send("Express on Vercel" + appId));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;