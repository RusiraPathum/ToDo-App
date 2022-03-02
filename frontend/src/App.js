import './App.css';
import ToDoTable from './component/ToDoTable';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ToDoTable/>
    </div>
  );
}

export default App;
