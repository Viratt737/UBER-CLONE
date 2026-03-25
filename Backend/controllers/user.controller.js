const userModel = require('../Models/user.model');
const userService = require('../service/user.service');
const{validationResult} = require('express-validator');
const blackListTokenModel = require('../Models/blacklisttoken.model')

module.exports.registerUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("VALIDATION ERRORS:", errors.array())
        return res.status(400).json({ errors: errors.array() });
    }
     console.log(req.body) 
    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);
    // console.log(hashedPassword);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}

module.exports.loginUser = async(req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{email, password} = req.body;
    
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({
            msg :" invalid email or password"
        });
    }
     const isMatch = await user.comparePassword(password);
     if(!isMatch){
        return res.status(401).json({
            msg:"invalid email or passwrod"
        });
     }

     const token = user.generateAuthToken();
     res.cookie('token', token);
     res.status(200).json({token ,user});
}

module.exports.getUserProfile = async(req, res, next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req, res, next) =>{
    res.clearCookie('token');
    const token = req.cookie.token || req.headers.authorization.spit(' ')[1];
    await blackListTokenModel.create({token});
   
    res.status(200).json({
        msg :"logged out"
    });
}
