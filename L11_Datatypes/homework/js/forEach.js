function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}

forEach([1, 2, 3], function(el) {
	console.log(el)
});