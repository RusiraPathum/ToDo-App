import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import ToDoTable from './component/ToDoTable';
import ToDoForm from './component/ToDoForm';
import Header from './component/Header';
import UpdateTodoForm from './component/UpdateTodoForm';


function App() {
  return (

    <div className="container">
    
      <Router>

        <Header />
        <Route path='/' exact component={ToDoTable} />
        <Route path='/add' exact component={ToDoForm} />
        <Route path="/update/:id" exact component = {UpdateTodoForm}/>

      </Router>
    </div>
  );
}

export default App;
