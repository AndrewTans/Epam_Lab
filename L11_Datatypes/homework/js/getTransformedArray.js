function getTransformedArray(array, callback){
	var transformedArray = [];
	forEach(array, function(el){
		transformedArray.push(callback(el));
	});
	return transformedArray;
}

function increment(num){
	return num + 1;
}


console.log(getTransformedArray([1,2,3], increment));