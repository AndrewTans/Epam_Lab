var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var crypto = require('crypto');


app.use(bodyParser.json())

app.listen(3000, function() {
	console.log('server listening on port 3000!');
});

let arr = [];

app.post('/users', function(req, res) {
	let validation = true;
	let key = 'TheKey123';

	for (let i = 0; i < arr.length; i++) {
		if (parseInt(arr[i].id) === parseInt(req.body.id) || arr[i].email === req.body.email) {
			validation = false;
			break;
		}
	}

	if (validation) {
		if (!Array.isArray(req.body)) {
			arr.push(req.body);
		} else {
			arr = req.body;
		}

		for (let i = 0; i < arr.length; i++) {
			for (key in arr[i]) {
				if (key == 'password') {
					arr[i].password = crypto.createHmac('sha256', key)
						.update(arr[i].password)
						.digest('hex');
				}
				// to check how password was ecrypted
				console.log(arr[i].password);
			}
		}

		fs.writeFile('storage.data', JSON.stringify(arr), function(error) {
			if (error) {
				console.log('error');
				return res.status(500).end('Error');
			} else {
				console.log(arr);
				console.log("Data saved successfully!");
				return res.status(201).end('Data saved successfully!');
			}
		});
	} else {
		console.log('User with this id or email already exist');
		return res.status(409).end('User with this id or email already exist');
	}
});

app.get('/users', function(req, res) {
	let content;

	fs.readFile('storage.data', function read(error, data) {
		if (error) {
			console.error('Read with error');
			return res.status(500).end('Error');
		} else {
			content = JSON.parse(data);
			for (let i = 0; i < content.length; i++) {
				delete content[i].password;
			}
			res.send(content);
		}
	});
});

app.get('/users/:id', function(req, res) {
	let content = [];
	let result, index;
	let key = 'TheKey123';
	let idCheck = req.params.id;

	fs.readFile('storage.data', function read(error, data) {
		if (error) {
			console.log('error');
			return res.status(500).end('Error');
		} else {
			content = JSON.parse(data);

			for (let i = 0; i < content.length; i++) {
				if (parseInt(idCheck) === parseInt(content[i].id)) {
					result = content[i];
					index = content[i].id;
					break;
				}
			}

			if (parseInt(index) === parseInt(idCheck)) {
				delete result.password;
				return res.send(result);
			} else {
				console.log('User has been not found');
				return res.status(404).end('User has been not found');
			}
		}
	});
});

app.put('/users/:id', function(req, res) {
	var content = [];
	var idCheck = req.params.id;
	var tempNum;

	fs.readFile('storage.data', function read(error, data) {
		if (error) {
			return res.status(500).end('Error');
		} else {
			content = JSON.parse(data);

			for (let i = 0; i < content.length; i++) {
				if (idCheck == content[i].id) {
					tempNum = i;
					break;
				}
			}

			if (parseInt(tempNum) === tempNum) {

				let inputKey = Object.keys(req.body);
				inputKey.forEach(function(key) {
					content[tempNum][key] = req.body[key];
				});

				fs.writeFile('storage.data', JSON.stringify(content), function(error) {
					if (error) {
						console.log('error');
						return res.status(500).end('Error');
					} else {
						console.log("User has been successfully updated.");
						return res.send(content[tempNum]);
					}
				});
			} else {
				console.log("User has been not found!");
				return res.status(404).end('User has been not found');
			}
		}
	});
});

app.delete('/users/:id', function(req, res) {
	let content = [];
	let result = null;
	let idCheck = req.params.id;

	fs.readFile('storage.data', function read(error, data) {
		if (error) {
			return res.status(500).end('Error');
		} else {
			content = JSON.parse(data);

			for (let i = 0; i < content.length; i++) {
				if (idCheck == content[i].id) {
					result = i;
					break;
				}
			}
			if (result !== null) {
				content.splice(result, 1);
				fs.writeFile('storage.data', JSON.stringify(content), function(error) {
					if (error) {
						return res.status(500).end('Error');
					} else {
						console.log("User has been deleted!");
						return res.send({
							"message": "User has been successfully removed."
						});
					}
				});
			} else {
				console.log("User has been not found!");
				return res.status(404).end('User has been not found');
			}
		}
	});
});