const riderModel = require('../Models/rider.model');


module.exports.createRider = async ({
     firstname, lastname, email , password,
     color, plate, capacity, vehicleType
}) =>{
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }

    const rider = riderModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return rider;
}