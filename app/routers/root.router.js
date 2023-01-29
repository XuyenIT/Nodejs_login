const express = require("express");
const userRouter = require("./user.router");
const rootRouter = express.Router();
rootRouter.use("/", userRouter);
module.exports = rootRouter;
