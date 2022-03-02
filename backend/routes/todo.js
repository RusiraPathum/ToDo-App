const router = require("express").Router();
const Todo = require("../models/TodoModel")

router.post("/saveTodo", async (req,res) =>{
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