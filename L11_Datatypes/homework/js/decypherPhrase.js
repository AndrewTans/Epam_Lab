function decypherPhrase(template, string){
	var reverse;
	var newData = Object.keys(template).reduce(function(reverse,el){
   		reverse[template[el]] = el;
   		return reverse;
	},{});
	return cypherPhrase(newData, string);
}

var charactersMaps = {a: 'o', c: 'd', t: 'g'};

console.log(decypherPhrase(charactersMaps, 'kiggy dog' ));