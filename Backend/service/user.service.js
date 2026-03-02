const userModel = require('../Models/user.model');
module.exports.createUser = async({
    firstname, lastname, email, password
}) => {
    if(!firstname || !email || !password){
        return ("All fields are required");
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}