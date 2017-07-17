function isPrime(number){
	for(i = number; i>1; i--){
		console.log(i);
		if (number % i == 0 && number != i){
			return false;
		} else if (i == 2) {
			return true;
		} else {
			continue;
		}
	}
}

alert(isPrime(7));