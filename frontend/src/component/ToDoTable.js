import React, { useState, useEffect } from 'react'
import { Button, Table, } from 'react-bootstrap';
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Swal from 'sweetalert2'

function ToDoTable() {

    const [todo, setTodo] = useState([]);

    useEffect(() => {
        getToDoList();
    }, []);

    // get all todo list function
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

    // confirmation message function
    function confirmationMessage(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodo(id);
            }
        })
    }

    // delete todo function
    function deleteTodo(id) {
        axios
            .delete(`http://localhost:5000/todo/delete/${id}`)
            .then(() => {

                Swal.fire({

                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Todo has been deleted.',
                    showConfirmButton: false,
                    timer: 1500
                })

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            })
            .catch((err) => {
                console.log(err);
            });

    }

    //todo Complete function
    function completeTodo(id, status) {

        if (status == 1) {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'This Todo already completed',
                showConfirmButton: false,
                timer: 1500
            });

        } else {

            const data = { status: "1" }

            axios
                .put("http://localhost:5000/todo/complete/" + id, data)
                .then((response) => {

                    // console.log(response.data)

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Todo has successfully completed',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

                })
                .catch((err) => {
                    // console.log(err)
                });

        }
    }

    return (
        <div className='mt-5'>
            <Table className='table table-striped text-center'>
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
                                <td>
                                    <Link style={{ marginRight: 20 }}
                                        className="btn btn-warning pr-3" to={`/update/${item._id}`}>
                                        Edit
                                    </Link>

                                    <button style={{ marginRight: 20 }}
                                        className="btn btn-danger"
                                        onClick={() => {
                                            confirmationMessage(item._id);
                                        }}
                                    >
                                        Delete
                                    </button>

                                    {item.status == "0" && (
                                        <button style={{ marginRight: 20 }}
                                            className="btn btn-success pl-5"
                                            onClick={() => {
                                                completeTodo(item._id, item.status)
                                            }}
                                        >
                                            Not Complete
                                        </button>
                                    )}

                                    {item.status == "1" && (
                                        <button style={{ marginRight: 20 }}
                                            className="btn btn-info pl-5"

                                            onClick={() => {
                                                completeTodo(item._id, item.status)
                                            }}
                                        >
                                            Complete
                                        </button>
                                    )}

                                </td>

                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default ToDoTable