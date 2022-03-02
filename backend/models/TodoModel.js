const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema(
    {
        todoId: { type: String, unique: true },
        name: { type: String, required: true },
        des : { type: String, required: true },
        status : { type: Boolean },
    },
    { timeStamps: true },
);

module.exports = mongoose.model("ToDo", ToDoSchema);