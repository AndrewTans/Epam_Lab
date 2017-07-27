function smallest() {
	return Array.prototype.reduce.call(arguments, function(a, b) {
		return Math.min(a, b);
	});
}

module.exports = smallest;