import { Button, Form, Card, } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'


export default function ToDoForm() {

    const [name, setname] = useState("");
    const [des, setdes] = useState("");

    // create formdata object
    const formData = { name, des }

    // save todo function
    function saveToDo(e) {

        e.preventDefault()

        axios
            .post("http://localhost:5000/todo/add", formData)
            .then((response) => {
                console.log(response.data);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response.data,
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
            <Card className="">
                <Card.Header><h1 className='text-center'>Add Todo</h1></Card.Header>
                <Card.Body className='text-left'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ToDo Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter ToDo Name" onChange={(e) => { setname(e.target.value); }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required type="text" placeholder="Description" onChange={(e) => { setdes(e.target.value); }} />
                        </Form.Group>

                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button onClick={saveToDo} variant="primary" type="submit">
                        Save
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}
