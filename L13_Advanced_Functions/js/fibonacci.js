function mainFib(n) {
	var storage = [];

	function fib(n) {

		if (n in storage) {
			return storage[n];
		} else if (n <= 1) {
			return n;
		} else {
			return storage[n] = fib(n - 1) + fib(n - 2);
		}
	}
	return fib;
};

var fibonacci = mainFib();

module.exports = fibonacci;