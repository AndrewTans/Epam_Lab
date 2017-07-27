var mainFibb = () => {
	var memory = [];

	var fibb = (n) => {
		if (n in memory) {
			return memory[n];
		} else if (n <= 1) {
			return n;
		} else {
			return memory[n] = fibb(n - 1) + fibb(n - 2);
		}
	}
	return fibb;
};

var fibbonacci = mainFibb();
// console.log(fibbonacci(100));

module.exports = fibbonacci;