var sp = ' ';
var sh = '#';
var i = 0;

while (i < 5){
	if (i % 2 == 0){
		console.log(sh+sp+sh+sp+sh+sp+sh+sp);
	} else {
		console.log(sp+sh+sp+sh+sp+sh+sp+sh);
	}
	i++;
}