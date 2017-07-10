var a = prompt('Choose a value', '2');
	a = parseFloat(a);
var b = prompt('Choose b value', '-3');
	b = parseFloat(b);
var c = prompt('Choose c value', '1');
	c = parseFloat(c);

var d = (b * b) - (4 * a * c);
var d_scr = Math.sqrt(d);

var x1 = (- (b) + d_scr) / (2 * a);
var x2 = (- (b) - d_scr) / (2 * a);

console.log('X1 = ' + x1 + '; X2 = ' + x2);