var express = require('express');
var bodyParser = require('body-parser'); //take json to request object

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./modules/todo');
var {User} = require('./modules/user');

var app = express();

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

app.get('/getall', (req, res) => {
	console.log(req.body);
	res.send('You got me!');
})


app.listen(3000, () => {
	console.log('Started on port 3000');
});


module.exports = {app};