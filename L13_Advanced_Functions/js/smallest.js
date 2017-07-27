function smallest() {
	return Array.prototype.reduce.call(arguments, function(a, b) {
		return Math.min(a, b);
	});
}
// console.log(smallest(2, 0.1, -5, 100, 3));

module.exports = smallest;