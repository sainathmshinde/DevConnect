const mongoose = require("mongoose");

// const {Schema} = mongoose;

// const userSchem = new Schema({
// or

const userSchem = new mongoose.Schema({
    firstName : {
        type: String,
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("User",userSchem);

// or

// const User = mongoose.model("User",userSchem);

// module.exports = User;