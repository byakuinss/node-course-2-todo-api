const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/modules/todo');
const {User} = require('./../server/modules/user');

// Todo.remove()
// remove({}) => remove all data in Todo
// find by query condition and remove
// Just got how many data removed
Todo.remove({}).then((result) => {
	console.log(result);
});


// Todo.findOneAndRemove
// Todo.findByIdAndRemove
// return a doc

Todo.findByIdAndRemove('585d37675208ca3606fdca98').then((todo) => {
	console.log(todo);
});

Todo.findOneAndRemove({_id: '585d37675208ca3606fdca98'}).then((todo) => {
	console.log(todo);
});