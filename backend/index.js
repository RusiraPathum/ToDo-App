//import express module
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const userRoute = require("./routes/user")
dotenv.config();

// create instance from express
const app = express();

//connect database
mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });