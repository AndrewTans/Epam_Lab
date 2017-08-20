var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var crypto = require('crypto');

app.use(bodyParser.json());

app.post('/users', function(req, res) {
	let arr;
	let validation = true;
	let key = 'TheKey123';
	let tempId;

	fs.readFile('storage.json', function read(error, data) {
		if (error) {
			console.log('error');
			return res.status(500).end('Error');
		} else {
			if (data == '') {
				arr = [];
			} else {
				arr = JSON.parse(data);
			}

			for (let i = 0; i < arr.length; i++) {
				if (arr[i].email == req.body.email) {
					validation = false;
					res.status(409).send('already exist');
					break;
				}
			}

			if (validation) {
				tempId = 1;
				if (!req.body.email) {
					return res.status(400).end('Bad request');
				} else {
					for (let i = 0; i < arr.length; i++) {
						// to make unique number
						if (arr[i].id === tempId) {
							tempId++;
							i = 0;
						}
					}
					req.body.id = tempId;
				}

					for (key in req.body) {
						if (key == 'password') {
							req.body.password = crypto.createHmac('sha256', key)
								.update(req.body.password)
								.digest('hex');
						}
						// to check how password was ecrypted
						console.log(req.body.password);
					}

				arr.push(req.body);
				fs.writeFile('storage.json', JSON.stringify(arr), function(error) {
					if (error) {
						console.log('error');
						return res.status(500).end('Error');
					} else {
						console.log(arr);
						console.log("Data saved successfully!");
						res.status(201).end('Data saved successfully!');
						// return res.status(201).end('Data saved successfully!');
					}
				});
			} else {
				validation = true;
				console.log('User with this id or email already exist');
				res.status(409).end('User with this id already exist');
			}
		}
	});
});

app.get('/users', function(req, res) {
	let content = [];

	fs.readFile('storage.json', function read(error, data) {
		if (error) {
			console.error('Read with error');
			return res.status(500).end('Error');
		} else {
			if (data == '') {
				res.status(200).send(['[]']);
			} else {
				content = JSON.parse(data);
				for (let i = 0; i < content.length; i++) {
					delete content[i].password;
				}
				res.status(200).send(content).end('Success');
			}
		}
	});
});

app.get('/users/:id', function(req, res) {
	let content = [];
	let result, index;
	let idCheck = req.params.id;

	fs.readFile('storage.json', function read(error, data) {
		if (error) {
			console.log('error');
			return res.status(500).end('Error');
		} else {
			if (data == '') {
				res.status(200).send([]);
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
					res.status(200).send(result).end('Success');
				} else {
					console.log('User has been not found');
					res.status(404).end('User has been not found');
				}
			}
		}
	});
});

app.put('/users/:id', function(req, res) {
	var content = [];
	var idCheck = req.params.id;
	var tempNum;

	fs.readFile('storage.json', function read(error, data) {
		if (error) {
			return res.status(500).end('Error');
		} else {
			if (data == '') {
				res.status(404).send("User has been not found!");
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

					fs.writeFile('storage.json', JSON.stringify(content), function(error) {
						if (error) {
							console.log('error');
							return res.status(500).end('Error');
						} else {
							console.log("User has been successfully updated.");
							res.status(200).send(content[tempNum]).end('User has been successfully updated.');
						}
					});
				} else {
					console.log("User has been not found!");
					return res.status(404).end('User has been not found');
				}
			}
		}
	});
});

app.delete('/users/:id', function(req, res) {
	let content = [];
	let result = null;
	let idCheck = req.params.id;

	fs.readFile('storage.json', function read(error, data) {
		if (error) {
			res.status(500).end('Error');
		} else {
			if (data == '') {
				res.status(404).send("User has been not found!");
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
					fs.writeFile('storage.json', JSON.stringify(content), function(error) {
						if (error) {
							return res.status(500).end('Error');
						} else {
							console.log("User has been deleted!");
							return res.status(200).send({
								"message": "User has been successfully removed."
							}).end('Success');
						}
					});
				} else {
					console.log("User has been not found!");
					return res.status(404).end('User has been not found');
				}
			}
		}
	});
});

app.listen(3000, function() {
	console.log('server listening on port 3000!');
});