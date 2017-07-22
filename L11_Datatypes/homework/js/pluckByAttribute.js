function pluckByAttribute (array, key){
	return getTransformedArray(array, function(item){
		return item[key];
	});
}

var presidents = [{ name: "George", surname: "Kush"} ,
                  { name: "Barako", surname: "Obaame"}];

console.log(pluckByAttribute(presidents, 'name'));