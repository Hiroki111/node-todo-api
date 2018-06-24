const {
	ObjectID
} = require('mongodb');

const {
	mongoose
} = require('./../server/db/mongoose');
const {
	Todo
} = require('./../server/models/todo');
const {
	User
} = require('./../server/models/user');

var id = '5b2f03810b4043426152f289';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// }, (e, docs) => {
// 	console.log(e);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// }, (e, docs) => {
// 	console.log(e);
// });

// Todo.findById(id).then((todo) => {
// 	console.log('Todo by ID', todo);
// }, (e, docs) => {
// 	console.log(e);
// });

id = '5b2eddeae27d3924baa99cbe';

User.findById(id).then((user) => {
	if (!user) return console.log('No user found.');

	console.log('User by ID', user);
}, (e, docs) => {
	console.log(e);
});