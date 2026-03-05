const userModel = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../Models/blacklisttoken.model');
module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || 
                  (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }
    const isBlackListed = await userModel.findOne({token : token});

    if(isBlackListed){
        return res.status(401).json({
            msg : "Unauthorized"
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded._id);

        if(!user){
            return res.status(401).json({
                msg: "User not found"
            });
        }

        req.user = user;

        next();

    }catch(error){
        console.log(error);
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }
}