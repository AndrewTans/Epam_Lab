const compose = function() {
	return Array.prototype.reduceRight.call(arguments, function(prevF, currentF) {
		return function() {
			return currentF(prevF.apply(this, arguments));
		}
	});
}

const classyGreeting = (firstName, lastName) =>
	"The name's " + lastName + ", " + firstName + " " + lastName;


const toUpper = string => string.toUpperCase();

const yellGreeting = compose(
	toUpper,
	classyGreeting,
);

// console.log(yellGreeting('James', 'Bond'));


module.exports = compose;