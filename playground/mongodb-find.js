const {
	MongoClient,
	ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.log('Unable to connect to MongoDB server');
		return;
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5b2ebc89397f0213247cb6d8')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(docs);
	// }, (e) => {
	// 	console.log('Unable to fetch todos.', e);
	// });

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (e) => {
	// 	console.log('Unable to fetch todos.', e);
	// });

	db.collection('Users').find().toArray().then((docs) => {
		console.log('Users');
		console.log(docs);
	}, (e) => {
		console.log('Unable to fetch todos.', e);
	});

	//client.close();
});