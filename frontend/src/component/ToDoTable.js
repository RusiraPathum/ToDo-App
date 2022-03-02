import React, { useState, useEffect } from 'react'
import { Button, Table, thead, tr, tbody } from 'react-bootstrap';
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


// import "./todoTable.scss";

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
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui text-center">
                        <h1 className="text-center">Are you sure?</h1>
                        <p className="text-center">You want to delete this Student?</p>
                        <button className="btn btn-primary mr-3" onClick={onClose}>
                            No
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                // this.handleClickDelete();

                                axios
                                    .delete(`http://localhost:5000/todo/delete/${id}`)
                                    .then(() => {

                                        window.location.reload();
                                    })
                                    .catch((err) => {
                                        alert(err.message);
                                    });

                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            },
        });
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


                                {/* <Link to={`/Update/` + std._id} className="btn btn-success">Edit</Link> */}

                                <td>
                                    <Link
                                        className="btn btn-warning mr-3" to={`/update/${item._id}`}>
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            confirmationMessage(item._id);
                                            // alert(item._id);
                                        }}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-success pl-5"
                                        onClick={() => {
                                            // confirmationMessage(item._id);
                                            alert(item._id);
                                        }}
                                    >
                                        Complete
                                    </button>

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