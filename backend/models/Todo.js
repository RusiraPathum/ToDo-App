const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema (add MONGODB)
const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  des: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
  },
});

//Create table (Documents)
const Todo = mongoose.model("Todo", TodoSchema);

//modual export
module.exports = Todo;
