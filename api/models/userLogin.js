const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    s_no: { 
        type: Number, 
        unique: true 
    },
    
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

   email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});

const User = mongoose.model("user_login",userSchema);
module.exports = User;