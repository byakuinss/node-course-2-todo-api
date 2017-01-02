const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'thor';

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });


var hashpassword = '$2a$10$KcLZHwC8FbujR2ARx4YKs.FI.0BxGxHNLE8hohI4u3Do.UnxHbWz.';
bcrypt.compare(password, hashpassword, (err, res) => {
	console.log(res);
});


// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, 'thor');
// console.log(token);

// var decoded = jwt.verify(token, 'thor');
// console.log('decoded', decoded);

// var message = 'love loki';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret');

// console.log(`resultHash: ${resultHash}`);
// console.log(`token.hash: ${token.hash}`);

// if (resultHash === token.hash){
// 	console.log('Data was not changed.');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }