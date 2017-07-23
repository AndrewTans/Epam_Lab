function pluckByAttribute (array, key){
	var result = getTransformedArray(array, function(item){
		return item[key];
	});
	return result;
}

var presidents = [{ name: "George", surname: "Kush"} ,
                  { name: "Barako", surname: "Obaame"}];

console.log(pluckByAttribute(presidents, 'name'));