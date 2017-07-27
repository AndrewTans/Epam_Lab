function largest() {
	return Array.prototype.reduce.call(arguments, function(a, b) {
		return Math.max(a, b);
	});
}

// console.log(largest(1, 5, 100, 3));

module.exports = largest;