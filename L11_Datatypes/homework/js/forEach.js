function forEach(arr, fn){
	for(var i = 0; i < arr.length; i++){
		fn(arr[i]);
	}
}

forEach([1,2,3], function(el){console.log(el) } );