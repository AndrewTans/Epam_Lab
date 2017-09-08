var model = {
	currentPerson: {},
	allPersons: [{
		name: 'Lily Butler',
		score: 2,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
	}, {
		name: 'Waller Perry',
		score: 4,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
	}, {
		name: 'Tammi Donovan',
		score: 5,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
	}, {
		name: 'Doreen Flowers',
		score: 4,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
	}, {
		name: 'Price Pace',
		score: 2,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
	}, {
		name: 'Larson Maldonado',
		score: 1,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
	}, {
		name: 'Berg Bolton',
		score: 5,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
	}, {
		name: 'Mack Lott',
		score: 3,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
	}, {
		name: 'Rosanna Mcleod',
		score: 4,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
	}, {
		name: 'Rosalie Rice',
		score: 1,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
	}, {
		name: 'Virginia Buchanan',
		score: 2,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
	}, {
		name: 'Lorna Stein',
		score: 4,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
	}, {
		name: 'Rosalie Steele',
		score: 3,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
	}, {
		name: 'Wilcox Boyd',
		score: 5,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
	}, {
		name: 'Ollie Rice',
		score: 5,
		photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
	}]
};

var control = {
	init: function() {
		listView.init();
		scoresView.init();
		scoresView.render();
		profileView.init();
		navigationView.init();
	},
	getAllNames: function() {
		return model.allPersons.map(function(el) {
			return el.name;
		});
	},
	getAllScores: function() {
		return model.allPersons.map(el => {
			return el.score;
		});
	},
	setCurrentPerson: function(index) {
		model.currentPerson = model.allPersons[index];
		control.viewCurrentProfile();
	},
	getCurrentPerson: function() {
		return model.currentPerson;
	},
	viewCurrentProfile: function() {
		profileView.render();
	},
	setCurrentPersonScore: function(value) {
		model.currentPerson.score = value;
		scoresView.render();
	},
	moveUp: function(index) {

		if (!index - 1 < 0) {
			let temp = model.allPersons[index - 1];
			model.allPersons[index - 1] = model.allPersons[index];
			model.allPersons[index] = temp;
			listView.init();
		}
	},
	moveDown: function(index) {

		if (index + 1 !== model.allPersons.length) {
			let temp = model.allPersons[index + 1];
			model.allPersons[index + 1] = model.allPersons[index];
			model.allPersons[index] = temp;
			listView.init();
		}

	}
};

var navigationView = {
	init: function() {
		navigationView.render();
		$('li').on("click", navigationView.handleClicks);
	},
	render: function() {

		let arrowUpm, arrowDown;
		let namesStr = '';

		arrows = `<span class="arrows"><span class="arrow-up"></span><span class="arrow-down"></span></span>`
		control.getAllNames().forEach(function(name, i) {
			namesStr += `<li id="arrow-${i}">${arrows}</li>`;
		});
		$('.arrows_block').html(namesStr);
	},
	handleClicks: function(event) {

		if ($(event.target).hasClass('arrow-up')) {
			control.moveUp($(event.target).parent().parent().index());
		} else if ($(event.target).hasClass('arrow-down')) {
			control.moveDown($(event.target).parent().parent().index());
		}


		console.log($(event.target));
	}
}

var listView = {
	init: function() {
		listView.render();
		$('.names').on("click", "li", listView.handleClicks);
	},
	render: function() {
		let namesStr = '';

		control.getAllNames().forEach(function(name, i) {
			namesStr += `<li id="${i}">${name}</li>`;
		});
		$('.names').html(namesStr);
	},
	handleClicks: function(event) {
		console.log($(event.target).index());
		control.setCurrentPerson($(event.target).index());
		console.log(model.currentPerson);
	}
};

var scoresView = {
	init: function() {
		this.handleClicks();
	},

	render: function(input) {
		let listStr = '';
		control.getAllScores().forEach(function(score, i) {
			listStr += `<li>
            		    <span>${score}</span>
                        <input id="${i}" class="hidden score-input" type="text" value="${score}">
                       </li>`;
		});
		$('.scores').html(listStr);
	},
	handleClicks: function() {
		$('.scores').on('click', 'li', function(e) {
			let currentLi = $(e.target);
			let currentSpan = currentLi.find('span');
			let currentInput = currentLi.find('input.score-input');
			let currentIndex = currentLi.index();
			if (!$currentInput.is('.hidden')) {
				return false;
			}
			control.setCurrentPerson(currentIndex);
			currentSpan.addClass('hidden');
			currentInput.removeClass('hidden').focus();
		});
		$('.scores').on('focusout .score-input', function(e) {
			let newScore = $(e.target).val();
			control.setCurrentPersonScore(newScore);
			control.setCurrentPerson(e.target.id);
			profileView.init();
		});
	}
};


var profileView = {
	init: function() {
		profileView.render();
	},
	render: function() {
		if (control.getCurrentPerson().name != undefined && control.getCurrentPerson().photoUrl != undefined) {
			console.log(control.getCurrentPerson());
			$('.afterList').html(`Selected person is <b>${control.getCurrentPerson().name}</b>. Person's score is: ${control.getCurrentPerson().score}`);
			$('.profile').html(`
							<div><img src="${control.getCurrentPerson().photoUrl}"><b>${control.getCurrentPerson().name}</b></div>
							<p>Score: ${control.getCurrentPerson().score}</p>
							`);
		}
	}
};

control.init();