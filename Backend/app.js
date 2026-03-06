const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const riderRoutes = require('./routes/rider.routes');
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get('/',(req, res) =>{
    return res.send("hello virat");
});

app.use('/users', userRoutes);
app.use('/rider', riderRoutes);
module.exports = app;