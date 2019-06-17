const router = require("express").Router();
const Todo = require("../models/todo");

router.get("/", (req, res) => {
  Todo.find({}).then(results => {
    let todos = results.filter(todo => {
      return !todo.done;
    });
    let done = results.filter(todo => {
      return todo.done;
    });
    res.render("index", { todos: todos, done: done });
  });
});

router.post("/todos", (req, res) => {
  let newTodo = new Todo({
    description: req.body.description
  });
  newTodo
    .save()
    .then(result => {
      console.log(result);
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
      res.redirect("/");
    });
});

router.post("/todos/:id/completed", (req, res) => {
  let todoId = req.params.id;
  Todo.findById(todoId)
    .exec()
    .then(result => {
      result.done = !result.done;
      return result.save();
    })
    .then(result => {
      res.redirect("/");
    });
  console.log(req.params);
  res.redirect("/");
});

module.exports = router;
