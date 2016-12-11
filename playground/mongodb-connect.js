//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//==get random objectid
// var obj = new ObjectID();
// console.log(obj);

//==example:
//==poll out object and create new variable (new function in ES6)
// var user = {name: 'Thor', age: 25};
// var {name} = user;
// console.log(name);

//==using callback function to handle connect error, 
//==otherwise return db object
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		//add return terms would end the function
		return console.log('Unable to connect to MongoDB server');
	}

	console.log('Connected to MongoDB server');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert todo');
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// })

	// db.collection('Users').insertOne({
	// 	name: 'Thor',
	// 	age: 25,
	// 	location: 'Asgard'
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert user');
	// 	}

	// 	console.log(result.ops[0]._id.getTimestamp());
	// })

	db.close();
});

