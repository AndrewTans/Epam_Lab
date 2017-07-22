function cypherPhrase(template, string){
	var splitted_string;
	var result;

	splitted_string = string.split('');
	var transform = getTransformedArray(splitted_string, function(el){
		if(template[el] != undefined){
			result = template[el];
		} else if (el != undefined){
			result = el;
		}
		return result;
	});
	return transform.join('');
}

charactersMap = {a: 'o', c: 'd', t: 'g'};

console.log(cypherPhrase(charactersMap, 'kitty cat' ));