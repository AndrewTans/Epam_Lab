function largest() {
	return Array.prototype.reduce.call(arguments, function(a, b) {
		return Math.max(a, b);
	});
}

module.exports = largest;