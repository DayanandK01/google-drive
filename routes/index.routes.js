const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config.js");
const fileModel = require("../models/files.models.js");
const authMiddleware = require("../middlewares/auth.js");
const firebase = require("../config/firebase.config.js");

// rendering home page if the user is logged-in
router.get("/home",authMiddleware, async (req, res)=>{
    
    const userFiles = await fileModel.find({
        user:req.user.userId
    })
    
    console.log(req.user);

    res.render("index.ejs",{
        files:userFiles,
    });
});


// post route to upload file to the firebase
router.post("/upload-file", authMiddleware, upload.single('file'), async (req,res)=>{
    // console.log(req.file);
    const newFile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId,

    });

    res.send(newFile);
});


// route to download uploaded file 
router.get("/download/:path", authMiddleware, async (req, res)=>{

    const loggedInUserId =req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUserId,
        path: path,
    });

    if(!file){
        return res.status(401).json({
            message: "unauthorized access to file"
        })
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action:'read',
        expires: Date.now() + 60 * 1000,
    });

    res.redirect(signedUrl[0])



})

module.exports = router;