const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
      fullname:{
         firstname:{
            type : String,
            required : true,
            minlength :3,
            trim : true,
         },
         lastname:{
            type: String,
            required : true,
            minlength :3
         }
      },
      emial:{
        type:String,
        required: true,
        unique : true,
        minlength : 6,
      },
      password:{
        type : String,
        required: true,
        select : false,
      },
      socketId:{
        type: String,
      },
});

// JWT token
userSchema.method.generateAuthToken = function (){
    try{
       return JWT.sign(
        {
            _id:this._id
        },
        process.env.JWT_SECRET_KEY,
         {
            expiresIn : "24h"
         }
       );
    }catch(err){
        console.log(err);
    }
};

// compare Password 
userSchema.method.comparePassword = async function(enteredPassword){
    try{
        return await bcrypt.compare(enteredPassword, this.password);
    }catch(err){
        console.log(err);
    };
}

// hash Password
userSchema.method.hashPassword = async function(password){
    try{
        return await bcrypt.hash(password, 10);
    }catch(err){
        console.log(err);
    }
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;