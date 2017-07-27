function isEven(n) {
	n = Math.abs(n);
	return n == 0 ? true :
		n != 1 ? isEven(n - 2) :
		false;
}
// console.log(isEven(5));

module.exports = isEven;