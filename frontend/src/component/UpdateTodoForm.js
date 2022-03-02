import { Button, Form,  } from 'react-bootstrap';
import React, {useState} from 'react';
import axios from 'axios';


export default function UpdateTodoForm() {

    const [name, setname] = useState("");
    const [des, setdes] = useState("");

    const formData = {name, des}
  
    function saveToDo(e){

        e.preventDefault()

        axios
          .post("http://localhost:5000/api/saveTodo/", formData)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          });
    }

    return (
        <div className='container mt-5'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ToDo Name</Form.Label>
                    <Form.Control  type="text" placeholder="Enter ToDo Name" onChange={(e) => {setname(e.target.value);}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" onChange={(e) => {setdes(e.target.value);}}/>
                </Form.Group>
                <Button onClick={saveToDo} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )
}
