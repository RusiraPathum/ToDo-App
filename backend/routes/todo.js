//import Router from express
const router = require("express").Router();

//import model
let Todo = require("../models/Todo");

//CRUD
//create data
router.route("/add").post((req, res) => {
  //arrow function

  const name = req.body.name;
  const des = req.body.des;

  //create object
  const newTodo = new Todo({ name, des });

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

//read data
router.route("/").get((req, res) => {
  Todo.find()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update
router.route("/update/:id").put(async (req, res) => {
  //fetch backend url user id
  let userId = req.params.id;

  //updated data (destructer)
  const { name, age, gender } = req.body;

  //update object
  const updateStudent = {
    name,
    age,
    gender,
  };

  //find student related this id
  //nic, email -> findOneAndUpdate
  //await -> not crash

  //status 200 -> successfull
  // res.status(200).send({status: "User Updated", user: update})

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      //status 200 -> successfull
      res.status(200).send({ status: "User Updated" });
    })
    .catch((err) => {
      console.log(err);
      //status 200 -> error
      res.status(500).send({ status: "Error with updating data", error: err.message });
      //   res.status(500).send({ status: "Error with updating data", error: err.message });
    });
});


//delete user
router.route("/delete/:id").delete(async (req, res) => {

  //get userId
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId).then(() => {
    res.status(200).send({ status: "User Deleted" });
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with delete user", error: err.message });
  })

})


//get one user
router.route("/get/:id").get(async (req, res) => {

  let userId = req.params.id;

  const user = await Student.findById(userId).then((student) => {
    // res.status(200).send({status : "User fetched", student})
    res.json(student)
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with get user", error: err.message })
  })

})

//module export
module.exports = router;
