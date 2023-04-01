const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const todoRoutes = express.Router();
const Todo = require("./schemaes/todoSchema");

app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
 console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
 console.log("Server is running on Port: " + PORT);
});

todoRoutes.get("/", async function (req, res) {
 /*Todo.find(function (err, todos) {
  if (err) {
   console.log(err);
  } else {
   res.json(todos);
  }
 });*/
 const allTodoes = await Todo.find();
 res.json(allTodoes);
});

todoRoutes.get("/:id", async function (req, res) {
 const todo = await Todo.findOne({ _id: req.params.id });
 res.json(todo);
});

todoRoutes.post("/add", async function (req, res) {
 let todo = new Todo(req.body);
 await todo
  .save()
  .then((todo) => {
   res.status(200).json({ todo: "todo added successfully" });
  })
  .catch((err) => {
   res.status(400).send("adding new todo failed");
  });
});

todoRoutes.post("/update/:id", async function (req, res) {
 try {
  const todo = await Todo.findOne({ _id: req.params.id });
  if (req.body.description) todo.description = req.body.description;

  if (req.body.responsible) todo.responsible = req.body.responsible;

  if (req.body.priority) todo.priority = req.body.priority;

  await todo.save();
  res.send(todo);
 } catch {
  res.status(404);
  res.send({ error: "todo not saved" });
 }
});

todoRoutes.delete("/delete/:id", async (req, res) => {
 try {
  console.log(req.params);
  await Todo.deleteOne({ _id: req.params.id });
  res.status(204).send();
 } catch {
  res.status(404);
  res.send({ error: "Todo doesn't exist!" });
 }
});
