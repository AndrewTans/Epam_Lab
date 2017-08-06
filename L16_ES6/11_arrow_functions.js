var inputs = process.argv.slice(2);
var result = inputs.map(el => el.slice(0, 1)).reduce((a, b) => a + b);
console.log(result);