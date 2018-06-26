const jwt = require('jsonwebtoken');
const {
	SHA256
} = require('crypto-js');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log(hash);
	});
});

var hashedPassword = '$2a$10$yoJtj9cqyKB8OEav46tG.eARMcvjWD4X./n9K8asc8XCEY8XxBAbu';

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});

// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'blah').toString()
// };

// //token.data.id = 5;

// var result = SHA256(JSON.stringify(token.data) + 'blah').toString();

// if (result === token.hash) {
// 	console.log("Data wasn't changed.");
// }
// else {
// 	console.log("Data was changed. Don't trust it!");
// }