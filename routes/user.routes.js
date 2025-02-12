const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// rendering register page to the user
router.get("/register",(req,res)=>{
    res.render("register.ejs")
});


// registering a new user in our application
router.post("/register",
    body("user_name").trim().isLength({min:3}),
    body("email").trim().isEmail(),
    body("password").trim().isLength({min:5}),
    async (req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(
                {errors:"Your data is not valid"},
                {message:"invalid data"});
        }

        const {user_name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            user_name:user_name,
            email:email,
            password:hashedPassword,
        })

        res.status(201).json(newUser);
});


// login page 

router.get("/login",(req, res)=>{
    res.render("login.ejs")
});

router.post("/login",
    body("user_name").trim().isLength({min:3}),
    body("password").trim().isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                    error: errors.array(),
                    message:"invalid data"
                }
            )
        }
 
        const {user_name, password} = req.body;

        const user = await User.findOne({
            user_name:user_name
        })

        if(!user_name){
            return res.status(400).json({
                message:"username or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"username or password is incorrect"
            })
        }

        // generating token using jwt package
        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            user_name:user.user_name
        }
        ,process.env.JWT_SECRET
    );

    res.cookie("token",token)
    res.send("logged in");
});


module.exports = router;