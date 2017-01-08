require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); //take json to request object
const bcrypt = require('bcryptjs');
const {SHA256} = require('crypto-js');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./modules/todo');
var { User } = require('./modules/user');
var { ObjectID } = require('mongodb');
var { authenticate } = require('./middleware/authenticate');

var app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        //res.send(e);
        res.status(400).send(e);
    })
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    //res.send(req.params);

    if (!ObjectID.isValid(id)) {
        console.log('id is not valid.');
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        //console.log(JSON.stringify(todo), undefined, 2);
        res.send({ todo });
    }).catch((e) => console.log(e));

});


app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log('id is not valid.');
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => console.log(e));
});


app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    //choose the object in request body and save into body object
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        console.log('id is not valid.');
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        //return javascript time
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(
        {   _id: id,
            _creator: req.user._id
        }, 
        { $set: body }, 
        { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });

})

// POST /users
// use _.pick and patch, save

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    // model method
    //User.findByToken

    // instance method
    //user.generateAuthToken	

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user)=>{
    	return user.generateAuthToken().then((token) => {
    		res.header('x-auth', token).send(user);
    	});
    }).catch((e) => {
    	res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// app.delete('/todos/:id', (req, res) => {
//     var id = req.params.id;

//     if (!ObjectID.isValid(id)) {
//         console.log('id is not valid.');
//         return res.status(404).send();
//     }

//     Todo.findByIdAndRemove(id).then((todo) => {
//         if (!todo) {
//             return res.status(404).send();
//         }
//         res.send({ todo });
//     }).catch((e) => console.log(e));
// });

app.delete('/users/me/token', authenticate, (req, res) => {
    //call instance method
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

module.exports = { app };
