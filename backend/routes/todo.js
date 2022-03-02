//import Router from express
const router = require("express").Router();

//import model
let Todo = require("../models/Todo");


//add todo
router.route("/add").post((req, res) => {

  const name = req.body.name;
  const des = req.body.des;
  const status = 0;

  //create object
  const newTodo = new Todo({ name, des, status });

  //send database
  newTodo
    .save()
    .then(() => {
      //success body (parse json)
      res.json("Todo Add Successfully");
    })
    .catch((err) => {
      //error
      console.log(err);
    });
});

//read todo
router.route("/").get((req, res) => {
  Todo.find()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update todo
router.route("/update/:id").put(async (req, res) => {

  let todoId = req.params.todoId;

  //updated todo data 
  const name = req.body.name;
  const des = req.body.des;

  //update todo object
  const updateTodo = {
    name,
    des,
  };

  // console.log(updateTodo);

  await Todo.updateOne(todoId, {name:req.body.name, des:req.body.des})
    .then(() => {
      //status 200 -> successfull
      res.status(200).send({ status: "Todo Updated" });
    })
    .catch((err) => {
      console.log(err);
      //status 500 -> error
      res.status(500).send({ status: "Error with updating Todo", error: err.message });
    });
});


//delete todo
router.route("/delete/:id").delete(async (req, res) => {

  //get todoId
  let todoId = req.params.id;

  await Todo.findByIdAndDelete(todoId).then(() => {
    res.status(200).send({ status: "Todo Deleted" });
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with delete Todo", error: err.message });
  })

})


//get one todo
router.route("/get/:id").get(async (req, res) => {

  let todoId = req.params.id;

  const todo = await Todo.findById(todoId).then((response) => {
    res.json(response)
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with get todo", error: err.message })
  })

})

//complete todo
router.route("/complete/:id").put( async (req, res) => {

  let todoId = req.params.id;

  await Todo.findByIdAndUpdate(todoId, {status:req.body.status})
    .then(() => {
      //status 200 -> successfull
      res.status(200).send({ status: "Todo Completed" });
    })
    .catch((err) => {
      console.log(err);
      //status 500 -> error
      res.status(500).send({ status: "Error with Completing Todo", error: err.message });
    });
});

//module export
module.exports = router;
