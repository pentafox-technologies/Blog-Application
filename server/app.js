import express from "express";
import bodyparser from "body-parser";

const app=express()

import userRouter from "./routes/userRoute.js"
import articleRouter from "./routes/articleRoute.js"

app.use("/user", userRouter)
app.use("/article", articleRouter)

export default app