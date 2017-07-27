function fibonacci(n) {
	if (n <= 1) {
		return n;
	} else {
		return fibonacci(n - 1) + fibonacci(n - 2);
	}
}

function cacheFunc(fn) {
	var cache = [];
	return function(n) {
		if (cache[n] === undefined) {
			cache[n] = fn(n);
		}
		return cache[n];
	}
}

fibonacci = cacheFunc(fibonacci);
// console.log(fibonacci(50));


module.exports = fibonacci;