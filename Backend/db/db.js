const mongoose = require('mongoose');
const connectToDb = async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected succesfully !!");
    }catch(err){
        console.log("That error are happend",err);
        process.exit(1);
    }
}
module.exports = connectToDb;