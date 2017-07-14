var award = 0;
var money = 0;
var area = 5;
var triple = 1; // triple award or not
var ask;
var random_num = Math.floor((Math.random() * area) + 1);
var attempt = 0;

var game = confirm('Бажаєте почати гру?');

if (game == true){
    for (attempt = 3; attempt > 0; attempt--){
    do {
	   var user_num = prompt(`Спроба: ${4 - attempt}; \n Введіть число від 0 до ${area}`, '');
	   user_num = parseInt(user_num);

    if (isNaN(user_num) == true){
    	alert('Будь-ласка, введіть число');
	}

	} while (isNaN(user_num) == true);

    if (user_num == random_num){
        money = 10 * triple;
        if (attempt == 1){ // if its last try
            award += (2 * triple); // 3d round. So it will be minimum award and if its triple award then: 2 * 3
        } else {
            award += ((money) / (4 - attempt)); // if its first round then it will be (4-3) if its 2 round it will be (4 - 2 = 2) half award
        }

        alert(`Ви вгадали з ${4 - attempt} спроби! Ваш виграш: ${award} доларів`);
        ask = confirm('Бажаєте продовжити?');

        if (ask == true){
            attempt = 4;  
            triple *= 3; // if yes then award will be triple
            area *= 2; // now it will be from 1 to 10
            random_num = Math.floor((Math.random() * area) + 1);
            continue;
        } 

        else { 
            alert(`Дякуємо за гру! \nВаш виграш: ${award} доларів`);
        break;
        }
    } else if (user_num > random_num) {
        alert(`Перебор! Залишилось ${attempt - 1} спроб.`);

        if (attempt == 1){ // if no more try left
        	ask = confirm('Бажаєте зіграти ще раз?');
        if (ask == true){
            attempt = 4;
            award = 0;
            triple = 1;
            area = 5;
            } else {
            alert('Дякуємо за гру!');
            break;
            }
        }
        continue;
    }
    else if (user_num < random_num){
        alert(`Недобор! Залишилось ${attempt - 1} спроб.`);
        if (attempt == 1){ // if no more try left
        ask = confirm('Бажаєте зіграти ще раз?');
        if (ask == true){
            attempt = 4;
            award = 0;
            triple = 1;
            area = 5;
        } else {
	        alert('Дякуємо за гру!');
	        break;
        	}
        }
        continue;
    }
    else {
    	alert('Спроби скінчились!');
    	ask = confirm('Бажаєте зіграти ще раз?');
        if (ask == true){
            attempt = 4;
            award = 0;
            triple = 1;
            area = 5;
        } else {
            alert('Дякуємо за гру!');
            break;
        }
    }
}

} else {
	alert('Сьогодні ви не виграли мільйон, а могли');
}