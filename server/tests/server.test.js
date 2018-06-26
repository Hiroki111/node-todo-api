const expect = require('expect');
const request = require('supertest');
const {
	ObjectID
} = require('mongodb');

const {
	app
} = require('./../server');
const {
	Todo
} = require('./../models/todo');
const {
	User
} = require('./../models/user');
const {
	todos,
	populateTodos,
	users,
	populateUsers
} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) return done(err);

				Todo.find({
					text
				}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should not create a todo with invalid data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/${new ObjectID().toHexString(0)}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[0]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) return done(err);

				Todo.findById(hexId)
					.then((todo) => {
						expect(todo).toBe(null);
						done();
					}, (e, docs) => {
						return done(e);
					});

			})
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.delete(`/todos/${new ObjectID().toHexString(0)}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if object id is invalid', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();

		var body = {
			text: "First - updated",
			completed: true
		};

		request(app)
			.patch(`/todos/${hexId}`)
			.send(body)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);

				expect(res.body.todo._id).toBe(hexId);
				expect(res.body.todo.text).toBe(body.text);
				expect(res.body.todo.completed).toBe(body.completed);
				done();
			})
	});

	it('should clear completedAt when todo is not completed', (done) => {
		var hexId = todos[1]._id.toHexString();

		var body = {
			text: "Second - updated",
			completed: false
		};

		request(app)
			.patch(`/todos/${hexId}`)
			.send(body)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);

				expect(res.body.todo._id).toBe(hexId);
				expect(res.body.todo.text).toBe(body.text);
				expect(res.body.todo.completed).toBe(body.completed);
				expect(res.body.todo.completedAt).toBe(null);
				done();
			})
	});
});

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should create a user', (done) => {
		var email = 'akira111@gmail.com';
		var password = 'apple111';

		request(app)
			.post('/users')
			.send({
				email,
				password
			})
			.expect(200)
			.expect((res) => {
				expect((res.headers['x-auth'])).toBeTruthy();
				expect((res.body._id)).toBeTruthy();
				expect((res.body.email)).toBe(email);
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				User.findOne({
					email
				}).then((user) => {
					expect(user).toBeTruthy();
					expect(user.password).not.toBe(password);
					done();
				})
			});
	});

	it('should return validation errors if password is less than 6 chars', (done) => {
		var email = 'anothermockemail@gmail.com';
		var password = '12345';
		request(app)
			.post('/users')
			.send({
				email,
				password
			})
			.expect(400)
			.end(done);
	});

	it('should not create user if email in use', (done) => {
		var email = users[0].email;
		var password = '123456';
		request(app)
			.post('/users')
			.send({
				email,
				password
			})
			.expect(400)
			.end(done);
	});
})