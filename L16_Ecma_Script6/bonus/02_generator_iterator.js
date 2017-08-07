function *factorial(n) {
	let res = 1;
	for (let i = 1; i <= n; i++) {
		yield res *= i;
	}
}

for (var n of factorial(5)) {
	console.log(n)
}