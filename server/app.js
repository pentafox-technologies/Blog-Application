const express = require('express');
const bodyparser=require('body-parser');

const app=express();

const articleRouter = require('./routes/articleRoute');
const categoryRouter = require('./routes/categoryRoute');
const userRouter = require('./routes/userRoute');
const supportRouter=require('./routes/supportRoute');

app.use("/api/v1/article", articleRouter);
app.use("/api/v1/support", supportRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;