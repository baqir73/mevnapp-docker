const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
let todoModel = require('./todo_schema')


mongoose.connect("mongodb://localhost:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;db.on('open', () => {
    console.log('Connected to mongoDB');
});

db.on('error', (error) => {
    console.log(error);
    console.log('Error!')
})

const bodyParser = require('body-parser') 

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());


app.get('/', (req, res) => {  
 	  res.send("Backend is working!");    
});

//creating a todo
app.post('/todo/add', (req, res) => {  
let newTodo = new todoModel;
newTodo.title = req.body.todo;
newTodo.completed = false;
newTodo.save((err) => {  
	if(err){      
		res.send("Error while adding Todo");    
	}else{ 	
		res.send("Todo added");    
	}})
});

// FETCH TO-DO

// completed
app.get("/todo/completed", (req, res) => {
  todoModel.find({ completed: true }, (err, todos) => {
    if (err) {
      res.send("Error while fetching Todos");
    } else {
      res.json(todos);
    }
  });
});

// uncompleted
app.get("/todo/uncompleted", (req, res) => {
  todoModel.find({ completed: false }, (err, todos) => {
    if (err) {
      res.send("Error while fetching Todos");
    } else {
      res.json(todos);
    }
  });
});

// update
app.post("/todo/complete/:id", (req, res) => {
  todoModel.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    (err, todo) => {
      if (!err) {
        res.send("Good Work");
      }
    }
  );
});

// delete todo
app.delete("/todo/:id", (req, res) => {
  let query = { _id: req.params.id };
  todoModel.deleteOne(query, err => {
    if (err) {
      res.send("Error while deleting todo");
    } else {
      res.send("Todo deleted");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

