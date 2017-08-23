// varik  NORM
var promise = getJSON('http://api.open-notify.org/astrsos.json');
console.log(typeof promise); // -> “object”
promise.then(function(data) {
    console.log(data.message); // -> “success”
}).catch(function(err){
    console.log(err);
});

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = (error) => reject(error);
    xhr.send();
  });
};

// varik 2
// var promise = getJSON('http://api.open-notify.org/astros.json');
// console.log(typeof promise); // -> “object”
// promise.then(function(data) {
//     console.log(data.message); // -> “success”
// }, function(error) {
//     console.log(error);
// });


// function getJSON(url) {
//     return new Promise(function(resolve, reject) {
//         fetch(url).then(function(response) {
//             return response.json();
//         }).then(function(returnedValue) {
//             resolve(returnedValue);
//         }).catch(function(err) {
//             reject(err);
//         });

//     });
// }

/////////////////////////////////


let scriptTag = document.createElement('script');
scriptTag.setAttribute('src', 'http://marsweather.ingenology.com/v1/archive/?callback=getData&page=1&format=jsonp');

let headTag = document.getElementsByTagName('head')[0];
headTag.appendChild(scriptTag);

let counter = 0;
let pageNumPrev = null;
let pageNumNext = null;
let nextPage = true;
let max_in_arr;
let tembObj;

loadAnim('none', 'block');

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

function appendFunc(tMin='null', tMax='null', date, wSpeed='- -', wDirection='- -') {
    let weatherBlock = document.getElementById('weather_block');
    let weatherWrapper;
    let title = [];
    if (document.getElementById('weatherWrapper') === null) {
        weatherWrapper = document.createElement('div');
        weatherWrapper.id = 'weatherWrapper';
    } else {
        weatherWrapper = document.getElementById('weatherWrapper');
    }
console.log(wSpeed);
    title[0] = document.createElement('div');
    title[0].innerHTML = `THE WEATHER ON MARS IS:`;
    title[0].className = 'titleWeather';
    title[1] = document.createElement('div');
    title[1].className = 'tempratureStyle';
    if (tMin == 'null' || tMax == 'null'){
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
    loadAnim('block', 'none');
    console.log(data.report);

    pageNumPrev = data.next;
    pageNumNext = data.previous;
    max_in_arr = data.results.length;
    tembObj = data.results;
    console.log(tembObj);
    console.log(data.next);
    console.log(data.previous);

    appendFunc(tembObj[counter].mins_temp, tembObj[counter].maxs_temp, tembObj[counter].terrestrial_date);
}

document.getElementById('nav_buttons').addEventListener('click', chooseFunc);

function chooseFunc(event) {
    let directionPrev = true;
    console.log(counter);
    let targetEl = event.target || event.srcElement;
    console.log(targetEl);

    if (targetEl.getAttribute('class') === 'prev') {
        clearFunc();
        if (counter + 1 == max_in_arr) {
            console.log('SUCCESS PREVIOUS');
            clearScriptTag(pageNumPrev);
            counter = 0;
            nextPage = false;
        } else {
            counter++
            console.log(counter);
            console.log(tembObj[counter]);
            appendFunc(tembObj[counter].min_temp, tembObj[counter].max_temp, tembObj[counter].terrestrial_date);
            loadAnim('block', 'none');
        }
    } else if (targetEl.getAttribute('class') === 'next') {
        if (counter === 0 && pageNumNext != null) {
            clearFunc();
            clearScriptTag(pageNumNext)
            counter = max_in_arr - 1;
            nextPage = false;
        } else if (!counter - 1 < 0) {
            console.log('SUCCESS');
            counter--
            console.log(counter);
            console.log(tembObj[counter]);
            clearFunc();
            appendFunc(tembObj[counter].min_temp, tembObj[counter].max_temp, tembObj[counter].terrestrial_date);
            loadAnim('block', 'none');
        } else {
            console.log('WOOPS');
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