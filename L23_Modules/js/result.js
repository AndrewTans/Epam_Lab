import calculate from './calculate';
import interfaceModule from './interface.js';
export default {
	resultFunc: resultFunc
};

interfaceModule.interfaceGenerator();

function resultFunc() {

	let buttonsBlock = document.getElementById('buttons_wrapper'),
		input1 = document.getElementById('input1'),
		input2 = document.getElementById('input2'),
		result = document.getElementById('result');

	buttonsBlock.addEventListener('click', function(event) {

		let targetEl = event.target || event.srcElement;

		if (targetEl.id === 'add') {
			result.innerHTML = calculate.calcFunc(input1.value, input2.value, calculate.add);
		} else if (targetEl.id === 'minus') {
			result.innerHTML = calculate.calcFunc(input1.value, input2.value, calculate.minus);
		} else if (targetEl.id === 'multiply') {
			result.innerHTML = calculate.calcFunc(input1.value, input2.value, calculate.multiply);
		} else if (targetEl.id === 'div') {
			result.innerHTML = calculate.calcFunc(input1.value, input2.value, calculate.div);
		}

		input1.value = '';
		input2.value = '';
	});
}