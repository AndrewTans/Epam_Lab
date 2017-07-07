var a = prompt('Choose a value', '2');
	a = parseFloat(a);
var b = prompt('Choose b value', '-3');
	b = parseFloat(b);
var c = prompt('Choose c value', '1');
	c = parseFloat(c);

    d = (b * b) - (4 * a * c);
    d_scr = Math.sqrt(d);

	x2 = (- (b) + d_scr) / (2 * a);
	x1 = (- (b) - d_scr) / (2 * a);

	alert('X1 = ' + x1 + '; X2 = ' + x2);