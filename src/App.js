import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodosList, { CreateTodo, EditTodo } from "./components/Todos";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
     return (
          <Router>
               <div className="App">
                    <NavBar />
                    <Routes>
                         <Route path="/" exact element={<TodosList />} />
                         <Route path="/edit/:id" element={<EditTodo />} />
                         <Route path="/create" element={<CreateTodo />} />
                    </Routes>
               </div>
          </Router>
     );
}

export default App;
