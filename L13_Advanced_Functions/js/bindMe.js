Function.prototype.bindMe = function(context) {
	var that = this;
	// to remember this from this object, not from window
	return function() {
		return that.apply(context, arguments);
	}
};


function addPropToNumber(number) {
	return this.prop + number;
}

var bound = addPropToNumber.bindMe({
	prop: 9
});

// console.log(bound(1));