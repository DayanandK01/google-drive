//require mongoose 
const mongoose = require("mongoose");


// connecting to mongodb database 
async function connectToDB(){
    return await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("mongodb has connected to nodejs successfully")
    })
}

// exporting the connection
module.exports = {
    connectToDB,
}