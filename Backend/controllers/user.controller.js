const userModel = require('../Models/user.model');
const userService = require('../service/user.service');
const{validationResult} = require('express-validator');
module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
     res.status(200).json({token ,user});
}