
function guessingGame(){
	
var award = 0;
var area = 5;
var triple = 1; // triple award or not
var gameStart;
var user_num = 0;
var random_num;
var attempt = 0;
var game;





// functions list
function rundomNum(){
	random_num = Math.floor(Math.random() * area);
}

function confirmGame(){
gameStart = confirm('Бажаєте почати гру?');
	if (gameStart == false){
		return alert('Сьогодні ви не виграли мільйон, а могли...');
		game = false;
	} else {
		game = true;
	}
}

function attempts(){
for (attempt = 3; attempt > 0; attempt--){
	do {
	   var user_num = parseInt(prompt(`Спроба: ${4 - attempt}; \nВведіть число від 0 до ${area}`, ''));
    	if (isNaN(user_num) == true){
    		alert('Будь-ласка, введіть число');
		}
	} while (isNaN(user_num) == true);
	if (user_num < random_num){
		alert(`Недобор, у вас залишилось ${attempt-1} спроб`);
		continue;
	} else if (user_num > random_num){
		alert(`Перебор, у вас залишилось ${attempt-1} спроб`);
		continue;
	} else {
		break;
	}
}
}

function ifGuessedNumber(){
switch (attempt){
	case 3:
		award += (10 * triple);
		alert (`Ви вгадали з першої спроби! Ваш виграш: ${award} доларів`);
		playMore();
	break;
	case 2:
		award += (5 * triple);
		alert (`Ви вгадали з другої спроби! Ваш виграш: ${award} доларів`);
		playMore();
	break;
	case 1:
		award += (2 * triple);
		alert (`Ви вгадали з третьої спроби! Ваш виграш: ${award} доларів`);
		playMore();
	break;
	case 0:
		award = 0;
		triple = 1;
		area = 5;
		playMore();
	break;
}
}

function playMore(){
if (attempt > 0){
	game = confirm('Бажаєте продовжити гру?');
} else {
	game = confirm('Бажаєте зіграти ще раз?');
}
if (game == true) {
	if (attempt !== 0){
		triple *= 3;
		area *= 2;
	} else {
		triple = 1;
		area = 5;
	}
} else {
	alert(`Дякуємо за гру! Ваш виграш: ${award} доларів!`);
}
}
// end of functions

confirmGame();
while (game == true){
rundomNum();
attempts();
ifGuessedNumber();
}

}

guessingGame();

