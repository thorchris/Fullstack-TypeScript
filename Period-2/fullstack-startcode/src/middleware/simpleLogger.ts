import express from "express";
const app = express();
const debug = require("debug")("app");
//Simple Logger

export default
    app.use((req, res, next) => {
        debug(`A ${req.method} Request was made.\nTime: ${new Date()}\nURL: ${req.originalUrl}\nRemote IP: ${req.ip}\n`);
        next();
    });