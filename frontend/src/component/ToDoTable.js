import React, { useState, useEffect } from 'react'
import { Button, Table,} from 'react-bootstrap';
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

    //confoirmation message
    function confirmationMessage(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui text-center">
                        <h1 className="text-center">Are you sure?</h1>
                        <p className="text-center">You want to delete this Todo?</p>
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
                                        console.log(err);
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

    //todo Complete function
    function completeTodo(id, status){
    
        const data = {status: "1"}

        axios
            .put("http://localhost:5000/todo/complete/" +id , data)
            .then((response) => {
                
                // console.log(response.data)

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response.status,
                    showConfirmButton: false,
                    timer: 1500
                });

                window.location.reload();

            })
            .catch((err) => {
                // console.log(err)
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
                                <td>
                                    <Link  style={{marginRight: 20}}
                                        className="btn btn-warning pr-3" to={`/update/${item._id}`}>
                                        Edit
                                    </Link>

                                    <button style={{marginRight: 20}}
                                        className="btn btn-danger"
                                        onClick={() => {
                                            confirmationMessage(item._id);
                                        }}
                                    >
                                        Delete
                                    </button>

                                    {item.status == "0" && (
                                        <button style={{marginRight: 20}}
                                            className="btn btn-success pl-5"
                                            onClick={() => {
                                                completeTodo(item._id, item.status)
                                                // alert(item._id);
                                            }}
                                        >
                                            Not Complete
                                        </button>
                                    )} 

                                    {item.status == "1" && (
                                        <button style={{marginRight: 20}}
                                            className="btn btn-info pl-5"
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