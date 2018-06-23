//const MongoClient = require('mongodb').MongoClient;
const {
	MongoClient,
	ObjectID
} = require('mongodb');

//var obj = new ObjectID();
//console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.log('Unable to connect to MongoDB server');
		return;
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Todos').insertOne({
		text: " Test text",
		completed: false
	}, (err, result) => {
		if (err) {
			console.log('Unable to insert todo', err);
			return;
		}

		console.log(JSON.stringify(result.ops, null, 2));
	});

	// db.collection('Users').insertOne({
	// 	name: " Hiroki",
	// 	age: 31,
	// 	location: "Brisbane"
	// }, (err, result) => {
	// 	if (err) {
	// 		console.log('Unable to insert user', err);
	// 		return;
	// 	}

	// 	console.log(result.ops[0]._id.getTimestamp());
	//});

	client.close();
});