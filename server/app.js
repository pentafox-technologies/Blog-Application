const express=require('express');
const bodyparser=require('body-parser');
// import bodyparser from "body-parser";


const app=express();

// import userRouter from "./routes/userRoute.js"
const articleRouter=require('./routes/articleRoute');
const categoryRouter=require('./routes/categoryRoute');
const userRouter=require('./routes/userRoute');
const supportRouter=require('./routes/supportRoute');
// import supportRouter from "./routes/supportRoute.js"
// import categoryRouter from "./routes/categoryRoute.js"


// app.use("/user", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/support", supportRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/user", userRouter);

// localhost:5000/api/v1/user/getAllUsers


module.exports=app;