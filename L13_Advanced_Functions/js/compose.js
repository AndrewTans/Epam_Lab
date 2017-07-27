const compose = function() {
	return Array.prototype.reduceRight.call(arguments, function(prevF, currentF) {
		var res = function() {
			return currentF(prevF.apply(this, arguments));
		}
		return res;
	});
}

const classyGreeting = (firstName, lastName) =>
	"The name's " + lastName + ", " + firstName + " " + lastName;


const toUpper = string => string.toUpperCase();

const yellGreeting = compose(
	toUpper,
	classyGreeting,
);

module.exports = compose;