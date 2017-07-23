function forEach(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		callback(arr[i]);
	}
}

forEach([1, 2, 3], function(el) {
	console.log(el)
});