const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3, "username must be at least 3 char long"],
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13, "email must be 13 chars long"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,"password must be 5 chars long"]
    },
});

const User = mongoose.model("user",userSchema);

module.exports = User;