import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import ToDoTable from './component/ToDoTable';
import ToDoForm from './component/ToDoForm';
import Header from './component/Header';


function App() {
  return (

    <div className="container">
    
      <Router>

        <Header />
        <Route path='/' exact component={ToDoTable} />
        <Route path='/add' exact component={ToDoForm} />

      </Router>
    </div>
  );
}

export default App;
