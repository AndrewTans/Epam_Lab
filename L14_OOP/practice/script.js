function UserList(arr) {
	var _users = arr;
	console.log(this);
	this.showNames = function() {
		console.log(this);
		_users.forEach(function(el) {
			console.log(el.firstName);
		});
		return this;
	}
	this.showById = function(id) {
		var user_was_found;
		for (var i = 0; i < _users.length; i++) {
			if (id == _users[i].id) {
				user_was_found = _users[i].firstName + ' ' + _users[i].lastName;
				console.log(this);
				console.log(user_was_found);
			}
		}
		if (user_was_found == null) {
			console.log(this);
			console.log('Unable to find user with id: ' + id);
		}
		return this;
	}

	this.add = function(firstName, lastName, age) {
		var random_id = Math.floor(Math.random() * 50);
		var tempUser = {};
		tempUser.id = random_id;
		tempUser.firstName = firstName;
		tempUser.lastName = lastName;
		tempUser.age = age;
		// console.log(tempUser);

		_users.push(tempUser);
		// console.log(_users);
		console.log('Hi everyone, i am ' + firstName)
		return this;
	}

	this.removeById = function(delId) {
		var user_was_found;
		for (var i = 0; i < _users.length; i++) {
			if (delId == _users[i].id) {
				user_was_found = _users[i].firstName;
				console.log(user_was_found);
				console.log('bb user ' + _users[i].firstName + ' ' + _users[i].lastName)
				_users.splice(i, 1);
				console.log(user_was_found);
			}
		}
		if (user_was_found == null) {
			console.log('Unable to find user with id: ' + delId);
		}
		return this;
	}


	this.logUsersCould = function(usersCount) {
		var result = usersCount.length;
		console.log(`There are ${result} users`);
		return this;
	}
}

var users = [{
	"id": "1385249082126",
	"firstName": "Bob",
	"lastName": "Snow",
	"age": 30
}, {
	"id": "1285249082126",
	"firstName": "Jack",
	"lastName": "Snow",
	"age": 30
}, {
	"id": "4315249082126",
	"firstName": "Jonhny",
	"lastName": "Snow",
	"age": 30
}, {
	"id": "1235249082126",
	"firstName": "Billy",
	"lastName": "Snow",
	"age": 30
}, {
	"id": "3485249082126",
	"firstName": "Cool",
	"lastName": "Snow",
	"age": 30
}, {
	"id": "1485249082126",
	"firstName": "Mac",
	"lastName": "Snow",
	"age": 30
}];

var userL = new UserList(users);


// user.showNames();
// userL.showById("34852490282126");

// userL.add('Andrew', 'Qwerty', '30');

// userL.removeById('1485249082126');

// userL.logUsersCould(users);


userL.showNames(users).showById(15).removeById(22);