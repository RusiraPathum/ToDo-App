//import express module
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoRoute = require("./routes/todo");
const Todo = require("./models/TodoModel")
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

app.use(express.json());

// todo save route
app.post("/api/saveTodo", async (req,res) =>{
    const newTodo = new Todo({
        name : req.body.name,
        des : req.body.des,
    })

    try{
        const saveTodo = await newTodo.save();
        res.status(201).json(saveTodo);

    }catch(err){
        res.status(500).json(err);
    }
    

    
})

app.route("/api/getTodo").get((req, res) => {
    Todo.find()
      .then((res) => {
        res.json(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
});