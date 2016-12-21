const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/modules/todo');
const {User} = require('./../server/modules/user');

// var id = '58594c487947b9903c48ecd1111';

// if(!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

var user_id = '5853f979938537b430c686a7';
if(!ObjectID.isValid(user_id)){
	console.log('ID not valid.');
}

User.findById(user_id).then((user) => {
	if(!user){
		return console.log('Id not found.');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));