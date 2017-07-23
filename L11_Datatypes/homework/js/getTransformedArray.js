function getTransformedArray(arr, callback){
	var tempArr = [];
	forEach(arr, function(el){
		tempArr.push(callback(el));
	});
	return tempArr;
}

function increment(num){
	return num + 1;
}


console.log(getTransformedArray([1,2,3], increment));