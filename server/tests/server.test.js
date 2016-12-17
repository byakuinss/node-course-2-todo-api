const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../modules/todo');


beforeEach((done) => {
	Todo.remove({}).then(() => done());
});


describe('POST /todos', () => {
	it('should create new Todo1', (done) => {
		var text = 'test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)  //http status 200
			.expect((res) => {
				//check response is correct
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				//check db data is correct
				Todo.find().then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});

	});


	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err){
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(0);
					done();
				}).catch((e) => done(e));
			});
	});
	
});