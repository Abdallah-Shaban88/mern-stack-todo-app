import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import NormalForm from "./Form";
import { BasicInput, CheckBoxInput } from "./Inputs";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const TodosList = () => {
 const [todoes, setTodoes] = useState(null);
 const deleteTodo = (id) => {
  console.log(id);
  axios
   .delete(`http://localhost:4000/todos/delete/${id}`)
   .then((res) => console.log(res))
   .catch((err) => console.log(err));
 };

 useEffect(() => {
  axios
   .get("http://localhost:4000/todos/")
   .then((response) => {
    setTodoes(response.data);
   })
   .catch(function (error) {
    console.log(error);
   });
 }, []);
 return (
  <div className="w-auto">
   {todoes &&
    todoes.map((todo) => (
     <Card className="d-flex flex-row align-items-center">
      <Card.Body className={todo.completed ? "complete" : ""}>
       <Card.Title>{todo.responsible}</Card.Title>
       <Card.Text>{todo.description}</Card.Text>
      </Card.Body>
      <Button className="border rounded h-25">
       <Link to={`/edit/${todo._id}`}>Edit</Link>
      </Button>
      <Button
       variant="danger"
       className="h-25"
       onClick={() => deleteTodo(todo._id)}
      >
       Delete
      </Button>
     </Card>
    ))}
  </div>
 );
};

export const EditTodo = () => {
 const inputs = [
  {
   label: "Description",
   type: "text",
  },
  {
   label: "Responsible",
   type: "text",
  },
 ];
 const navigate = useNavigate();
 const { id } = useParams();
 const [todo, setTodo] = useState();
 const [updatedTodo, setUpdatedTodo] = useState();
 useState(() => {
  axios
   .get(`http://localhost:4000/todos/${id}`)
   .then((res) => setTodo(res.data));
 }, []);
 console.log(updatedTodo);
 useEffect(() => setTodo(updatedTodo),[updatedTodo ])
 const onSubmit = (e) => {
  e.preventDefault();
  axios
   .post(`http://localhost:4000/todos/update/${id}`, {
    ...updatedTodo,
    completed: false,
   })
   .then((res) => navigate("/"));
 };
 return (
  <>
   <NormalForm submitHandler={onSubmit}>
    {todo &&
     inputs.map((input) => {
      const { type, label } = input;
      return (
       <BasicInput
        type={type}
        label={label}
        valueHandler={setUpdatedTodo}
        value={todo[`${label.toLowerCase()}`]}
       />
      );
     })}
    <div className="d-flex justify-content-between mt-2">
     {["Low", "Medium", "High"].map((ch) => (
      <CheckBoxInput
       label={ch}
       name="priority"
       valueHandler={setUpdatedTodo}
       checkVal={todo?.priority}
      />
     ))}
    </div>
   </NormalForm>
  </>
 );
};

export const CreateTodo = () => {
 const inputs = [
  {
   label: "Description",
   type: "text",
  },
  {
   label: "Responsible",
   type: "text",
  },
 ];

 const navigate = useNavigate();

 const [newTodo, setNewTodo] = useState({});

 const onSubmit = (e) => {
  e.preventDefault();
  axios
   .post("http://localhost:4000/todos/add", { ...newTodo, completed: false })
   .then((res) => navigate("/"));
 };
 return (
  <>
   <NormalForm submitHandler={onSubmit}>
    {inputs.map((input) => {
     const { type, label } = input;
     return <BasicInput type={type} label={label} valueHandler={setNewTodo} />;
    })}
    <div className="d-flex justify-content-between mt-2">
     {["Low", "Medium", "High"].map((ch) => (
      <CheckBoxInput label={ch} name="priority" valueHandler={setNewTodo} />
     ))}
    </div>
   </NormalForm>
  </>
 );
};

export default TodosList;
