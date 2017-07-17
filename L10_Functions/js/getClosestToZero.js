function getClosestToZero(){
		this.a = Math.abs(arguments[0]);
	for (i = 1; i < arguments.length; i++){
		if (Math.abs(arguments[i]) <= this.a){
			this.a = arguments[i];
		} 
	}
	return this.a;
}

console.log(getClosestToZero(9, 5, -4, -9));