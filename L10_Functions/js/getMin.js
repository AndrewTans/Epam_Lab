function getMin() {
	var a_min = arguments[0];
	for (i = 1; i < arguments.length; i++){
		if (arguments[i] <= a_min){
			a_min = arguments[i];
		} 
	}
	return a_min;
}

alert(getMin(50, 30, 1050, 100, 1, 5, 7, 8));