/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__result_js__ = __webpack_require__(1);


__WEBPACK_IMPORTED_MODULE_0__result_js__["a" /* default */].resultFunc();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_js__ = __webpack_require__(3);


/* harmony default export */ __webpack_exports__["a"] = ({
	resultFunc: resultFunc
});

__WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].calcFunc(1, 2, __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].add);
__WEBPACK_IMPORTED_MODULE_1__interface_js__["a" /* default */].interfaceGenerator();

function resultFunc() {

	let buttonsBlock = document.getElementById('buttons_wrapper'),
		input1 = document.getElementById('input1'),
		input2 = document.getElementById('input2'),
		result = document.getElementById('result');

	buttonsBlock.addEventListener('click', function(event) {

		let targetEl = event.target || event.srcElement;

		if (targetEl.id === 'add') {
			result.innerHTML = __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].calcFunc(input1.value, input2.value, __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].add);
		} else if (targetEl.id === 'minus') {
			result.innerHTML = __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].calcFunc(input1.value, input2.value, __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].minus);
		} else if (targetEl.id === 'multiply') {
			result.innerHTML = __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].calcFunc(input1.value, input2.value, __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].multiply);
		} else if (targetEl.id === 'div') {
			result.innerHTML = __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].calcFunc(input1.value, input2.value, __WEBPACK_IMPORTED_MODULE_0__calculate__["a" /* default */].div);
		}

		input1.value = '';
		input2.value = '';
	});
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	add: add,
	minus: minus,
	multiply: multiply,
	div: div,
	calcFunc: calcFunc
});

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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	interfaceGenerator: interfaceGenerator
});

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

/***/ })
/******/ ]);