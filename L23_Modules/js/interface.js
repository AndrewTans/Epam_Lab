export default {
	interfaceGenerator: interfaceGenerator
};

function interfaceGenerator() {

	let buttons = [];
	let values = [{
		name: 'add',
		action: '+'
	}, {
		name: 'minus',
		action: '-'
	}, {
		name: 'multiply',
		action: '*'
	}, {
		name: 'div',
		action: '/'
	}];

	let input1, input2, result, buttonsWrapper,
		container = document.getElementById('container'),
		interfaceBlock = document.createElement('form');
		
	interfaceBlock.id = 'calc_main';
	buttonsWrapper = document.createElement('div');
	buttonsWrapper.id = 'buttons_wrapper';

	result = document.createElement('div');
	result.id = 'result';
	interfaceBlock.appendChild(result);
	input1 = document.createElement('input');
	input1.id = 'input1';
	interfaceBlock.appendChild(input1);
	input2 = document.createElement('input');
	input2.id = 'input2';
	interfaceBlock.appendChild(input2);

	for (let i = 0; i < values.length; i++) {
		buttons[i] = document.createElement('input');
		buttons[i].setAttribute('type', 'button');
		buttons[i].setAttribute('value', values[i].action);
		buttons[i].setAttribute('id', values[i].name);
		buttonsWrapper.appendChild(buttons[i]);
	}

	interfaceBlock.appendChild(buttonsWrapper);
	container.appendChild(interfaceBlock);
}