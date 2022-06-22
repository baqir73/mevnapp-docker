const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
// let todoModel = require('./todo_schema')
let queriesModel = require('./queries_schema')


mongoose.connect("mongodb://localhost:27017/queriesapp", {
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
 	  res.send("Backend for queries app is working!");    
});

//getting all questions
app.get('/query/get', (req, res) => {  
  queriesModel.find({question: {$exists: true}}, (err, questions) => {
    if(err){      
      res.send("Error while fetching questions");    
    } else{ 	
      res.json(questions);    
    }}) 
});

//creating a query
app.post('/query/add', (req, res) => {  
let newQuery = new queriesModel;
newQuery.question = req.body.question;
newQuery.answers = [];
// newTodo.title = req.body.todo;
// newTodo.completed = false;
newQuery.save((err) => {  
	if(err){      
		res.send("Error while adding Query");    
	}else{ 	
		res.send("Query added");    
	}})
});

// FETCH TO-DO

// // completed
// app.get("/todo/completed", (req, res) => {
//   todoModel.find({ completed: true }, (err, todos) => {
//     if (err) {
//       res.send("Error while fetching Todos");
//     } else {
//       res.json(todos);
//     }
//   });
// });

// // uncompleted
// app.get("/todo/uncompleted", (req, res) => {
//   todoModel.find({ completed: false }, (err, todos) => {
//     if (err) {
//       res.send("Error while fetching Todos");
//     } else {
//       res.json(todos);
//     }
//   });
// });

// update query
app.post("/query/update/:id", (req, res) => {
  queriesModel.findByIdAndUpdate(
    req.params.id,
    { question: req.params.question },
    (err, todo) => {
      if (!err) {
        res.send("Question Updated");
      }
    }
  );
});

// delete query
app.delete("/query/:id", (req, res) => {
  let query = { _id: req.params.id };
  queriesModel.deleteOne(query, err => {
    if (err) {
      res.send("Error while deleting todo");
    } else {
      res.send("Query deleted");
    }
  });
});

// add answer
app.post("/query/answer/:id", (req, res) => {
  queriesModel.findByIdAndUpdate(
    req.params.id,
    { $push: {"answers": req.body.answer}},
    (err, todo) => {
      if (!err) {
        res.send("Question Updated");
      }
    }
  );
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});

