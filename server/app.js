const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
// import bodyparser from "body-parser";


const app=express();

// import userRouter from "./routes/userRoute.js"
const articleRouter = require('./routes/articleRoute');
const categoryRouter = require('./routes/categoryRoute');
const userRouter = require('./routes/userRoute');
const supportRouter = require('./routes/supportRoute');
const authController = require("./controllers/authController")
const cerbos = require("./middleware/cerbos");
// import supportRouter from "./routes/supportRoute.js"
// import categoryRouter from "./routes/categoryRoute.js"



app.use(express.json({ extended: true}));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/coverImage' ,express.static('public/assets/articleCoverImages'));
app.use('/profilePic' ,express.static('public/assets/userProfilePic'));
// app.use('/images', express.static(__dirname + 'public/assets/articleCoverImages'));
// app.use(morgan('dev'));
// app.use("/user", userRouter);


app.use("/api/v1/article", articleRouter);
app.use("/api/v1/support", supportRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/user", userRouter);

// localhost:5000/api/v1/user/getAllUsers

//cerbos sample 
app.get("/cerbos",authController.protect, async (req,res) => {
    
    if(await cerbos.isAllowed(req.user,{resource:"article"},"delete")){
        res.send("can access");
    }
    else {
        res.send("cannot access");
    }
})

module.exports = app;