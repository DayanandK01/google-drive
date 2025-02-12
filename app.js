const express = require("express");
const userRouter = require("./routes/user.routes.js");
const indexRouter = require("./routes/index.routes.js")
const dotenv = require("dotenv");
dotenv.config();
const {connectToDB} = require("./config/db.js");
connectToDB();
const cookieParser = require("cookie-parser");


const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes 
app.use("/", indexRouter);
app.use("/user",userRouter);

process.on('uncaughtException',(err)=>{
    console.log("uncaught expection");
    console.log(err);
})

app.listen(PORT,()=>{
    console.log(`server has started on port: ${PORT}`)
});