export default {
	add: add,
	minus: minus,
	multiply: multiply,
	div: div,
	calcFunc: calcFunc
}

function add(a, b) {
	return a + b;
}

function minus(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function div(a, b) {
	return a / b;
}

function calcFunc(a, b, callback) {
	if (parseFloat(a) != a || parseFloat(b) != b) {
		return `You must write two numbers!`;
	} else {
		return callback(parseFloat(a), parseFloat(b));
	}
}