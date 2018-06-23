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

	//deleteMany
	db.collection('Users').deleteMany({
		name: 'Hiroki'
	}).then((result) => {
		console.log(result);
	});

	//deleteOne
	// db.collection('Todos').deleteOne({
	// 	text: 'Eat lunch'
	// }).then((result) => {
	// 	console.log(result);
	// });

	//findOneAndDelete
	db.collection('Users').findOneAndDelete({
		_id: ObjectID("5b2eb8d4532931108a238fe3")
	}).then((result) => {
		console.log(result);
	});

	//client.close();
});