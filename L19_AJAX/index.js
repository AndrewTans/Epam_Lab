// Promise

var promise = getJSON('http://api.open-notify.org/astros.json');
console.log(typeof promise);
promise.then(function(data) {
	console.log(data.message);
}, function(err) {
	console.log(err);
});

function getJSON(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				return reject('Error ' + xhr.status + ': ' + xhr.statusText);
			}
			resolve(JSON.parse(xhr.responseText));
		}
		xhr.send();
	});
}

///////////////////////////////////

let scriptTag = document.createElement('script');
scriptTag.setAttribute('src', 'http://marsweather.ingenology.com/v1/archive/?callback=getData&page=1&format=jsonp');

let headTag = document.getElementsByTagName('head')[0];
headTag.appendChild(scriptTag);

let counter = 0;
let pageNumPrev = null;
let pageNumNext = null;
let nextPage = true;
let max_in_arr, tembObj, timeout;


loadAnim('none', 'block');
errorFunc();


function updatedDate(inputDate) {
	let tempArr = inputDate.split('-');
	let time, year, month, day, hours, minutes, mid;
	let monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	time = new Date(tempArr[0], tempArr[1], tempArr[2]);
	day = time.getDate();
	day = day < 10 ? '0' + day : day;
	year = time.getFullYear();

	return (`UPDATED ON ${monthNames[time.getMonth()-1].toUpperCase()} ${day}, ${year}`);
}

function averageTemprature(min, max) {
	let calc = (max + min) / 2;
	return Math.floor(calc) + '°С';
}

function appendFunc(tMin = 'null', tMax = 'null', date, wSpeed = '- -', wDirection = '- -') {
	wSpeed = wSpeed == null ? '- -' : '- -';
	wDirection = wDirection == null ? '- -' : '- -';
	let weatherBlock = document.getElementById('weather_block');
	let weatherWrapper;
	let title = [];
	if (document.getElementById('weatherWrapper') === null) {
		weatherWrapper = document.createElement('div');
		weatherWrapper.id = 'weatherWrapper';
	} else {
		weatherWrapper = document.getElementById('weatherWrapper');
	}
	title[0] = document.createElement('div');
	title[0].innerHTML = `THE WEATHER ON MARS IS:`;
	title[0].className = 'titleWeather';
	title[1] = document.createElement('div');
	title[1].className = 'tempratureStyle';
	if (tMin == 'null' || tMax == 'null') {
		title[1].innerHTML = 'NO INFO';
	} else {
		title[1].innerHTML = averageTemprature(tMin, tMax);
	}
	title[2] = document.createElement('span');
	title[2].innerHTML = `Wind speed: ${wSpeed} & `;
	title[2].className = 'windInfo';
	title[3] = document.createElement('span');
	title[3].innerHTML = `Wind direction: ${wDirection}`;
	title[3].className = 'windInfo';
	title[4] = document.createElement('div');
	title[4].innerHTML = updatedDate(date);

	for (let i = 0; i < title.length; i++) {
		weatherWrapper.appendChild(title[i]);
	}

	weatherBlock.insertBefore(weatherWrapper, document.getElementById('nav_buttons'));

}

// if data coudn't load for 3.0 sec
function errorFunc() {

	timeout = setTimeout(function() {
			loadAnim('block', 'none');
			document.getElementById('weather_block').innerHTML = `Sorry, but data couldn't be loaded`;
	}, 3500);
}

function clearFunc() {
	document.getElementById('weatherWrapper').innerHTML = '';
	loadAnim('none', 'block');
}

function clearScriptTag(url) {
	headTag.removeChild(scriptTag);
	scriptTag = document.createElement('script');
	scriptTag.setAttribute('src', url);
	headTag.appendChild(scriptTag);
}

function getData(data) {

	clearTimeout(timeout);
	loadAnim('block', 'none');
	pageNumPrev = data.next;
	pageNumNext = data.previous;
	max_in_arr = data.results.length;
	tembObj = data.results;
	appendFunc(tembObj[counter].min_temp, tembObj[counter].max_temp, tembObj[counter].terrestrial_date, tembObj[counter].wind_speed, tembObj[counter].wind_direction);
}

document.getElementById('nav_buttons').addEventListener('click', chooseFunc);

function chooseFunc(event) {
	let directionPrev = true;
	let targetEl = event.target || event.srcElement;

	if (targetEl.getAttribute('class') === 'prev') {
		clearFunc();
		if (counter + 1 == max_in_arr) {
			clearScriptTag(pageNumPrev);
			errorFunc();
			counter = 0;
			nextPage = false;
		} else {
			counter++
			appendFunc(tembObj[counter].min_temp, tembObj[counter].max_temp, tembObj[counter].terrestrial_date, tembObj[counter].wind_speed, tembObj[counter].wind_direction);
			loadAnim('block', 'none');
		}
	} else if (targetEl.getAttribute('class') === 'next') {
		if (counter === 0 && pageNumNext != null) {
			clearFunc();
			clearScriptTag(pageNumNext)
			errorFunc();
			counter = max_in_arr - 1;
			nextPage = false;
		} else if (!counter - 1 < 0) {
			counter--
			clearFunc();
			appendFunc(tembObj[counter].min_temp, tembObj[counter].max_temp, tembObj[counter].terrestrial_date);
			loadAnim('block', 'none');
		} else {
			console.log('There is no next page');
		}
	}
}

function loadAnim(block, anim) {
	if (document.getElementById('anim') === null) {
		let anim = document.createElement('div');
		let temp;
		anim.id = 'anim';
		for (let i = 1; i <= 3; i++) {
			temp = document.createElement('div');
			temp.className = 'rect' + i;
			anim.appendChild(temp);
		}
		document.getElementsByClassName('container')[0].appendChild(anim);
	}

	document.getElementById('weather_block').style.display = block;
	document.getElementById('anim').style.display = anim;
}