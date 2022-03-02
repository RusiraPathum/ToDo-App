import './App.css';
import ToDoTable from './component/ToDoTable';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (

    <Router>
      <div className="App container">
        <Route path='/' component={ToDoTable} />
      </div>
    </Router>

  );
}

export default App;
