import { Button, Form, } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export default function UpdateTodoForm() {

    let todoId = useParams().id;

    const [name, setname] = useState("");
    const [des, setdes] = useState("");

    const formData = { name, des }

    useEffect(() => {
        //call single todo function
        getsingaleToDo();
    }, []);

    //get single todo
    function getsingaleToDo() {
        axios
            .get("http://localhost:5000/todo/get/" + todoId)
            .then((response) => {
                // console.log(response);

                setname(response.data.name);
                setdes(response.data.des);

            })
            .catch((err) => {
                console.log(err)
            });
    }

    //todo update function
    function updteToDo(e) {

        e.preventDefault()

        axios
            .put("http://localhost:5000/todo/update/" + todoId, formData)
            .then((response) => {
                console.log(response.data);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Todo updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Update Todo</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ToDo Name</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Enter ToDo Name" onChange={(e) => { setname(e.target.value); }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={des} type="text" placeholder="Description" onChange={(e) => { setdes(e.target.value); }} />
                </Form.Group>
                <Button onClick={updteToDo} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )
}
