const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});

//todo Route
const todoRouter = require("./routes/Todo");

app.use("/todo", todoRouter);
