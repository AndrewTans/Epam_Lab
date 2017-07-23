/* 1 task */

// var votes = ["angular","angular","react","react","react","angular","ember","react","vanilla"];

// // var result = vote(votes); // {angular: 3, react: 4, ember: 1, vanilla: 1}
// var obj = {};
// function vote(array){
// 	for(var i = 0; i < votes.length; i++){
// 	if(obj.hasOwnProperty(votes[i]) ){
// 		obj[votes[i]]++;
// 	} else {
// 	obj[votes[i]] = 1;
// 		}
// 	}
// 	return obj;
// }
// console.log(obj);
// vote();

var users;
function getDataFromTextArea() {
    users = JSON.parse(document.getElementById('myTextAres').value);
    console.log(users);
    gender();
    MainColor();
    notUniqueName();
}


/*2 Task: GENDER*/
function gender(){
	var counterMale = 0;
	var counterFemale = 0;
	for (var key = 0; key < users.length; key++){
		if (users[key].gender.includes("Male")){
 			counterMale++;
		} else {
   			counterFemale++;
		}
	}
	console.log(`Women are ${counterFemale}`);
	console.log(`Mans are ${counterMale}`);
}


/*3, 4 Task Color*/
function MainColor(){
	var array = [];

	function uniqueColor(){
		for(var i = 0; i < users.length; i++){
			if(array.hasOwnProperty(users[i].favorite_color) ){
				array[users[i].favorite_color]++;
			} else {
				array[users[i].favorite_color] = 1;
			}
		}
		return console.log(array);
	}
	uniqueColor();

	function popularColor(){
		var max = 5;
		var color;
		for (var key in array) {
  	// console.log( "Key: " + key + " value: " + array[key] );
			if(max < array[key]){
				color = key;
				max = array[key];
			}
		}
		return console.log(`The most popular color is: ${color}. ${max} users choosed it`);
	}
	popularColor();
}

/*Task 5*/
function notUniqueName(){
	var array_name = [];
	for(var i = 0; i < users.length; i++){
		if(array_name.hasOwnProperty(users[i].name) ){
			array_name[users[i].name]++;
		} else {
			array_name[users[i].name] = 1;
		}
	}
	for (var key in array_name) {
  		// console.log( "Key: " + key + " value: " + array_name[key] );
  		if (array_name[key] < 2){
  			 delete array_name[key];
  		}
	}
	console.log('Not unique name are:');
	return console.log(array_name);
}