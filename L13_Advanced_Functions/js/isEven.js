function isEven(n) {
	n = Math.abs(n);
	return n == 0 ? true :
		n != 1 ? isEven(n - 2) :
		false;
}

module.exports = isEven;