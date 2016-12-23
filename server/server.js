var express = require('express');
var bodyParser = require('body-parser'); //take json to request object

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./modules/todo');
var {User} = require('./modules/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); 

app.post('/todos', (req, res) => {
	console.log(req.body);
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		//res.send(e);
		res.status(400).send(e);
	})
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	//res.send(req.params);

	if(!ObjectID.isValid(id)){
		console.log('id is not valid.');
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(404).send();
		} 
		//console.log(JSON.stringify(todo), undefined, 2);
		res.send({todo});
	}).catch((e) => console.log(e));

});


app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		console.log('id is not valid.');
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => console.log(e));
});


app.listen(port, () => {
	console.log(`Started on port ${port}`);
});


module.exports = {app};