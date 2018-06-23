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

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5b2ebc4d5d9befe335c6083c")
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5b2eba899334431167fa6472")
	}, {
		$set: {
			name: "Hiroki"
		},
		$inc: {
			age: 10
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	//client.close();
});