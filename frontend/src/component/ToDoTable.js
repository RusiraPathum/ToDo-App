import React from 'react'
import { Button, Table, thead, tr, tbody} from 'react-bootstrap';
import axios from 'axios';

function ToDoTable() {


    function getToDoList(){

        axios
          .post("http://localhost:8080/api/app/save/")
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          });

    }

    return (
        <div className='mt-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    
                </tbody>
            </Table>
        </div>
    )
}

export default ToDoTable