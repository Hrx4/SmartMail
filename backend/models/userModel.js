const mongoose  = require("mongoose");

const emailSchema = new mongoose.Schema({
    email : {
        type : String,
        require: true,
        unique: true
    },
    password :{
        type : String,
        require: true,
    }
})

const userSchema = new mongoose.Schema({
    // id : {
    //     type : String,
    //     require: true,
    //     unique: true,
    // },
    mainEmail :{
        type : String,
        require: true,
        unique: true
    },
    access_token : {
        type : String,
        require: true,
    },
    refresh_token : {
        type: String,
        require: true,
    },
    expires_in : {
        type: Number,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    picture: {
        type: String,
        require: true,
    },
    
    emails: [emailSchema]
})

module.exports = mongoose.model("User", userSchema);