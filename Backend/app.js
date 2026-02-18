const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
const connectToDb = require('./db/db');
connectToDb();
app.get('/',(req, res) =>{
    return res.send("hello virat");
});

module.exports = app;