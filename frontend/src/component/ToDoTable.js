import React, { useState, useEffect } from 'react'
import { Button, Table, thead, tr, tbody } from 'react-bootstrap';
import axios from 'axios';

function ToDoTable() {

    const [todo, setTodo] = useState([]);

    useEffect(() => {
        getToDoList();
    }, []);

    function getToDoList() {

        axios
            .get("http://localhost:5000/todo/")
            .then((response) => {
                setTodo(response.data);
                // console.log(response.data)
            })
            .catch((err) => {
                // console.log(err)
            });

    }

    function confirmationMessage(id) {
        confirmAlert({
          title: "Confirm",
          message: "Are you sure to delete this?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                deleteStudent(id);
              },
            },
            {
              label: "No",
              onClick: () => {},
            },
          ],
        });
      }

    return (
        <div className='mt-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ToDo Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {todo.map((item, key) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.des}</td>

                                {/* <button
                                    className="btn btn-success mt-1"
                                    onClick={() => {
                                        updateStudent(std._id);
                                    }}
                                >
                                    Edit
                                </button>
                                <Link to={`/Update/` + std._id} className="btn btn-success">Edit</Link> */}
                                <button
                                    className="btn btn-danger ml-3 mt-1"
                                    onClick={() => {
                                        confirmationMessage(item._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default ToDoTable